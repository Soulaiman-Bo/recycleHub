import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
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

  removeFile(index: number) {
    this.fileNames.splice(index, 1);
    this.fileRemoved.emit(index);
  }
}
