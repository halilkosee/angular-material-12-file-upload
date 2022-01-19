import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  filename = '';

  fileInfos?: Observable<any>;

  form: any = {
    fileName: null,
  };

  result! : ResultModel[];

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onAnalyse(filename : string): void {
    this.uploadService.analyse(filename).subscribe(
      data => {
        this.result = data;
      },
    );
    this.ngOnInit();
  }

  onDelete(filename : string): void {
    this.uploadService.delete(filename).subscribe(
      data => {
        this.result = data;
      },
    );
    this.ngOnInit();
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'upload the file!';
            }

            this.currentFile = undefined;
          });

      }
      this.selectedFiles = undefined;
    }
    this.ngOnInit();
  }
}

interface  ResultModel{
  warningRate: number,
  vulnerabilityType : string,
  detectedLineNumber : number,
  detectedLine : string,
  successCode : string
}
