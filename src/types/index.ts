export interface Studio {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
  // Add other relevant fields as per PRD or future needs
}

export interface Lesson {
  id: string;
  studioId: string;
  name: string;
  coach: string;
  time: string; // e.g., "10:00 - 11:00"
  date: string; // e.g., "2025-07-06"
  seatsAvailable: number;
  price: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
}