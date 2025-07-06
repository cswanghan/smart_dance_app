export interface Studio {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
  // Add other relevant fields as per PRD or future needs
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
}
