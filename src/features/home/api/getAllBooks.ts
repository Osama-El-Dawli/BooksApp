import { api } from '../../../api/apiService';
import { Book, VolumesResponse } from '../types/bookType';

export const getAllBooks = async (query: string): Promise<Book[]> => {
  const response = await api.get<VolumesResponse>('', {
    params: {
      q: query,
    },
  });

  return (response.data.items ?? []).map(({ id, volumeInfo: v }) => ({
    id,
    title: v.title,
    subtitle: v.subtitle,
    author: v.authors?.join(', ') ?? 'Unknown',
    rating: v.averageRating ?? 0,
    cover: v.imageLinks?.thumbnail.replace('http', 'https'),
    previewLink: v.previewLink
  }));
};
