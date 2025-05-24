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
  data: graphData[];
}

export interface graphData {
  yearMonth: string;
  total: string;
}
