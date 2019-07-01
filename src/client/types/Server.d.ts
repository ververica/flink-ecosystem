export type ServerResponse<T> = T &
  Partial<{
    status: string;
    message: string;
  }>;
