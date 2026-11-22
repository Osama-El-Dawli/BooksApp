type VolumeItem = {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    averageRating: number;
    imageLinks: { thumbnail: string };
    previewLink: string;
  };
};

export type VolumesResponse = {
  totalItems: number;
  items: VolumeItem[];
};

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  rating: number;
  cover: string;
  previewLink: string;
};

export type BooksState = {
  allBooks: Book[];
  featuredBooks: Book[];
  error: string | null;
  isLoading: boolean;
};
