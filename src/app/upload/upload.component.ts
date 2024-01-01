import { Component } from "@angular/core";
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { UploadDocumentService } from "../services/api/uploadDocument.service";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls:['./upload.component.css']
})
export class UploadComponent{

    private allowdExtension = ["jpg", "jpeg", "gif", "png", "doc", "docx", "txt", "xls", "xlsx", "pdf"];

    public files: UploadingFile[] = [];

    constructor(private uploadService: UploadDocumentService)
    {
    }

  public dropped(files: NgxFileDropEntry[]) {

    for (const droppedFile of files) {

      this.pushFile(droppedFile);

      if(this.isFileValidate(droppedFile) == false)
      {
        this.changeFileStatus(droppedFile.relativePath, -1, "Unsupported file");
        continue;
      }

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);

           this.uploadService.upload(droppedFile.relativePath, file).subscribe({
               next: (res) => {
                this.changeFileStatus(res.fileName, 1)
               },
               error: (err) => {
                //this.changeFileStatus()
               }
             });        


        });
      }
    }
  }

  private isFileValidate(file: NgxFileDropEntry) : boolean
  {
    var ext = file.relativePath.split('.').pop()?.toLowerCase();
    if(ext != null && this.allowdExtension.includes(ext!))
    {
      return true
    }

    return false;    
  }

  private pushFile(file: NgxFileDropEntry){

    this.files.push({
      fileName: file.relativePath,
      status: 0
    });
  }

  private changeFileStatus(fileName:string, status: number, error?: string){
    let file = this.files.filter(i => i.fileName == fileName);
    if(file != null && file.length == 1)
    {
      file[0].status = status;
      file[0].error = error;
    }
  }

}




class UploadingFile {
  fileName!: string;
  status!: number;
  error?: string;
}