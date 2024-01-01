import { Component, OnInit, TemplateRef, inject } from "@angular/core";
import { DocumentResponse } from "../services/api/responses/getListOfDocumentsResponse";
import { GenerateTemporaryLinkService } from "../services/api/generateTemporaryLink.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificationService } from "../services/notification.service";
import { GetListOfDocumentsService } from "../services/api/getListOfDocuments.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {

    private generateTemporaryLinkService = inject(GenerateTemporaryLinkService);
    private getListOfDocumentsService = inject(GetListOfDocumentsService);
    private modalService = inject(NgbModal);
    private notificationService = inject(NotificationService);
    private activeRoute = inject(ActivatedRoute);
    private router = inject(Router);

    currentDocument?: DocumentResponse;
    selectedExpirationTime?: number;
    temporaryLink?: string;

    totalCount: number = 0;
    pageSize: number = 20;
    currentPageNum: number = 1;

    documents: DocumentResponse[] = []

    ngOnInit() {

        this.activeRoute.queryParams.subscribe((data) => {
            let pageNumber = data['pageNumber'];            

            if (pageNumber == null || pageNumber == undefined) {
                pageNumber = 1;
            }

            this.currentPageNum = pageNumber;
            this.loadDocuments(pageNumber);
        });
    }

    loadDocuments(pageNumber: number) {
        this.getListOfDocumentsService.call(pageNumber, this.pageSize).subscribe({
            next: res => {
                this.documents = res.data;
                this.totalCount = res.totalCount;
            },
            error: err => { this.notificationService.showApiError(err); }
        });
    }

    OngenerateTempLinkButtonClicked(item: DocumentResponse, content?: TemplateRef<any>) {
        this.temporaryLink = undefined;
        this.currentDocument = item;

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    OnGenerateTempLink() {
        if (this.currentDocument == null) {
            return;
        }

        if (this.selectedExpirationTime == null) {
            this.notificationService.showWarning("Please select ExpirationTime");
            return;
        }

        this.generateTemporaryLinkService.call(this.currentDocument.id, this.selectedExpirationTime!).subscribe({
            next: res => { this.temporaryLink = res.url },
            error: err => { this.notificationService.showApiError(err); }
        });
    }

    CopyLinkToClipboard() {
        navigator.clipboard.writeText(this.temporaryLink!);
        this.notificationService.showSuccess("Link Copied");
    }

    OnPageChange(pageNum: number) {

        this.router.navigate(['/Dashboard/Documents'], { queryParams: { pageNumber: pageNum } });
    }

}