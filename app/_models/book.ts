export interface Book {
  book_id: number;
  book_title: string;
  author_id: number;
  publisher_id?: number;
  status_id: number;
  image_path?: string;
  book_summary?: string;
  book_isbn?: number;
}

export interface InsertBook {
  book_title: string;
  author_id: number;
  publisher_id?: number;
  status_id: number;
  categories_id: number[];
  book_summary: string;
}
