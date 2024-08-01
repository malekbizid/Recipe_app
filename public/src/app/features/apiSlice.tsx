import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RecipesResponse } from '../../interfaces/types';
const apiKey = 'eb60667a25mshb7d06e603d39456p1aa72ajsn449f7754bd33';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tasty.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', apiKey);
      headers.set('x-rapidapi-host', 'tasty.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipesResponse, { from: number; size: number; tags: string }>({
      query: ({ from, size, tags }) => `recipes/list?from=${from}&size=${size}&tags=${tags}`,
    }),
  }),
});

export const { useGetRecipesQuery } = apiSlice;
