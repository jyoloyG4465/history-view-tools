export interface Dataset {
  datasetId: number;
  datasetName: string;
  startDate: Date;
  endDate: Date;
}

export interface putDatasetRenameRequest {
  datasetId: number;
  datasetName: string;
}

export interface deleteDatasetRequest {
  datasetId: number;
}

export interface postDatasetCreateResopnse {
  datasetId: number;
}
