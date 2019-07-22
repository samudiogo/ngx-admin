export interface IResponse {
  statusCode: string;
  body:       Body;
  headers:    Headers;
}

export interface Body {
  Items:        Item[];
  Count:        number;
  ScannedCount: number;
}

export interface Item {
  id:    string;
  title: string;
}

export interface Headers {
  'Content-Type': string;
}
