import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = '/api';

export const productsApi = createApi({
  reducerPath: 'productsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), 
  tagTypes: ['Product'], 
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, updates }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;