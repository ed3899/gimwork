export interface GimWorkResponse<Data> {
  status: number;
  message: string;
  data?: Data;
  error?: string;
  timestamp: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
