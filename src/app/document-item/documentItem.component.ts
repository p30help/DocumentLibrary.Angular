import { Component, EventEmitter, Input, OnInit, Output,  inject } from "@angular/core";
import { DocumentResponse } from "../services/api/responses/getListOfDocumentsResponse";
import { DownloadDocumentService } from "../services/api/downloadDocument.service";
import { NotificationService } from "../services/notification.service";
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-document-item',
    templateUrl: './documentItem.component.html',
    styleUrls: ['./documentItem.component.css']
})
export class DocumentItemComponent implements OnInit {

    private downloadDocumentService = inject(DownloadDocumentService);
    private notificationService = inject(NotificationService);

    @Input()
    document?: DocumentResponse = undefined;

    @Output()
    generateTempLinkButtonClicked = new EventEmitter<DocumentResponse>();

    ngOnInit() {
    }

    OnGenerateTempLink(){
        this.generateTempLinkButtonClicked.emit(this.document!);
    }

    OnDownload(){

        this.downloadDocumentService.call(this.document!.id).subscribe({
            next: res => {
                saveAs(res);
            },
            error: err =>{
                this.notificationService.showApiError("Error on downloading document");
            }
        });
    }

    downloadFile(data: any) {
        const url= window.URL.createObjectURL(data);
        window.open(url);
      }
}