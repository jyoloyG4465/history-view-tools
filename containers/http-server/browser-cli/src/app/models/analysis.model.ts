export interface postGetDataRequest {
  datasetId: number;
  channelName?: string;
}

export interface getChannelListRequest {
  datasetId: number;
}

export interface getChannelListResponse {
  data: string[];
}

export interface postGetDataResponse {
  data: sample[];
}

export interface sample {
  yearMonth: string;
  total: string;
}
