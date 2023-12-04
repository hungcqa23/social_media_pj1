export interface ResponseAPI<Data> {
  message: string;
  data?: Data;
}

export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}
