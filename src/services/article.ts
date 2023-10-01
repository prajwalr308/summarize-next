import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY
const rapidApiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST
// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//       url: 'https://time.com/6266679/musk-ai-open-letter/',
//       length: '3'
//     },
//     headers: {
//       'X-RapidAPI-Key': rapidApiKey,
//       'X-RapidAPI-Host': rapidApiHost
//     }
//   };

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', rapidApiKey as string)
        headers.set('X-RapidAPI-Host', rapidApiHost as string)
        return headers
    }
}),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (parmas) => `summarize?url=${encodeURIComponent(parmas.url)}&length=${parmas.length|| 3}`,
        }),
    }),
})

export const { useLazyGetSummaryQuery } = articleApi;