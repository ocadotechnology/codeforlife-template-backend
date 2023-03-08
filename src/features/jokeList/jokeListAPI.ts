import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Joke } from './jokeListSlice';

const jokeListApi = createApi({
  reducerPath: 'jokeListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://official-joke-api.appspot.com/'
  }),
  endpoints: (builder) => ({
    getRandomJoke: builder.query<Joke, void>({
      query: () => 'random_joke'
    })
  })
});

export default jokeListApi;
export const { useGetRandomJokeQuery, useLazyGetRandomJokeQuery } = jokeListApi;
