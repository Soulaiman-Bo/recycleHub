import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPhoto, heroXMark, heroCloudArrowUp, heroDocument } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, NgIcon],
    viewProviders: [
      provideIcons({
        heroPhoto, heroXMark, heroCloudArrowUp, heroDocument
      }),
    ],
  templateUrl: './file-upload.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FileUploadComponent {
  @Input() label = 'Upload Files';
  @Input() multiple = false;
  @Input() accept = '*';

  @Output() fileUploaded = new EventEmitter<string>();
  @Output() fileRemoved = new EventEmitter<number>();

  isDragging = false;
  fileNames: string[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(Array.from(files));
    }
  }

  handleFileUpload(event: any) {
    const files = event.target.files;
    if (files) {
      this.processFiles(Array.from(files));
    }
    // Reset the input value to allow uploading the same file again
    event.target.value = '';
  }

  private processFiles(files: File[]) {
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileNames.push(file.name);
        this.fileUploaded.emit(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(index: number, event: Event) {
    // Prevent event from bubbling up to parent elements
    event.preventDefault();
    event.stopPropagation();

    this.fileNames.splice(index, 1);
    this.fileRemoved.emit(index);
  }
}
