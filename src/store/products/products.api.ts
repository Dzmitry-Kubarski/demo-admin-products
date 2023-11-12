import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../../features/products/types'

type TParamsGetAllProducts = {
    limit?: number
    page?: number
    search?: string
    filterByCategory?: string
    sort?: string
    orderSort?: 'asc' | 'desc' | ''
}

export const productsApi = createApi({
    reducerPath: 'products/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://demo-admin-roducts-api.onrender.com/'
    }),
    endpoints: (build) => ({
        getAllProducts: build.query<IProduct[], TParamsGetAllProducts>({
            query: ({ limit, search = '', sort = '', filterByCategory = '', page = 1 }) => ({
                url: `products?_page=${page}&_limit=${limit || 8}&q=${search}&_sort=${sort}${
                    filterByCategory ? `&category=${filterByCategory} ` : ''
                }`
            })
        }),

        getProductById: build.query<IProduct, number>({
            query: (productId: number) => ({
                url: `products/${productId}`
            })
        }),

        createProduct: build.mutation<IProduct, IProduct>({
            query(body) {
                return {
                    url: `products`,
                    method: 'POST',
                    body
                }
            }
        }),

        updateProduct: build.mutation<IProduct, IProduct>({
            query(body) {
                return {
                    url: `products/${body.id}`,
                    method: 'PATCH',
                    body
                }
            }
        }),

        deleteProduct: build.mutation<IProduct, number>({
            query(body) {
                return {
                    url: `products/${body}`,
                    method: 'DELETE',
                    body
                }
            }
        })
    })
})

export const {
    useLazyGetAllProductsQuery,
    useLazyGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApi
