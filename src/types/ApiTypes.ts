export interface ApiError {
  code: string;
  message: string;
  status?: number;
}

export interface ApiPageResponse {
  data: {
    id: number;
    url: string;
    name: string;
    description: string;
    content: string;
    updated_at?: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}