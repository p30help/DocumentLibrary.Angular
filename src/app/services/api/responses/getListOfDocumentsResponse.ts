export interface GetListOfDocumentsResponse {
    data: DocumentResponse[];
    totalCount: number,
    currentPageNumber: number
}

export interface DocumentResponse {
    id: string
    fileName: string
    contentType:string
    recordDate: Date,
    documentType: string
    downloadCount: number,
    thumbnailUrl?: string,
}