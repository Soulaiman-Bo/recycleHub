import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors'; // or wherever your user selector is
import { User } from '../../core/models/user.model';
import { ProfileService } from '../../core/services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class UserProfilePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private store = inject(Store);

  userForm!: FormGroup;
  currentUser?: User;
  loading = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    // 1) Get user from the store (assume they’re logged in)
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        // 2) Build form with user data
        this.buildForm(user);
      }
    });
  }

  /** Initialize reactive form with user data. */
  private buildForm(user: User): void {
    this.userForm = this.fb.group({
      // "id" and "role" cannot be updated, so we don't include them in the editable controls.
      // We can keep them read-only or skip them entirely in the form.
      username: [user.username, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      city: [user.city || ''],
      password: [''],  // Optional: user might change password or leave blank
      photos: [user.photos || ''], // base64-encoded string
    });
  }

  /**
   * Handle image file input.
   * We convert the selected file to Base64 and store in form's `photos` control.
   */
  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string; // e.g. "data:image/png;base64,iVBORw0KG..."
      this.userForm.patchValue({ photos: base64String });
    };
    reader.readAsDataURL(file);
  }

  /**
   * Submit updated profile.
   * For security, we might handle password changes separately,
   * but here we show a simple example.
   */
  onSubmit(): void {
    if (!this.currentUser) return; // no user => do nothing

    if (this.userForm.invalid) {
      this.errorMessage = 'Please check the form for errors.';
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValues = this.userForm.value; // { username, email, city, password, photos }

    // If password is blank, we might choose to omit it from the update
    if (!formValues.password) {
      delete formValues.password;
    }

    // Call service to update user
    this.profileService.updateUser(this.currentUser.id as string, formValues)
      .subscribe({
        next: (updatedUser) => {
          this.loading = false;
          this.successMessage = 'Profile updated successfully!';

          // Optionally store the updated user in the store, if needed
          // e.g., this.store.dispatch(updateUserSuccess({ user: updatedUser }));
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'An error occurred while updating profile.';
          console.error(err);
        },
      });
  }
}
