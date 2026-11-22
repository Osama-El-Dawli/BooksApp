import axios from 'axios';
import { API_KEY } from '@env';

export const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
  params: { key: API_KEY, Filtering: 'free-ebooks' },
});
