import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, NEW_PRODUCTS } from '../../features/products/types'

interface INewList {
    newProducts: IProduct[]
    isPublished: 'yes' | 'no'
}

const initialState: INewList = {
    newProducts: JSON.parse(localStorage.getItem(NEW_PRODUCTS) ?? '[]'),
    isPublished: 'no'
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addNewProduct(state, action: PayloadAction<IProduct>) {
            state.newProducts.push(action.payload)
            localStorage.setItem(NEW_PRODUCTS, JSON.stringify(state.newProducts))
        },

        toggleIsPublished(state, action: PayloadAction<'yes' | 'no'>) {
            state.isPublished = action.payload

            if (action.payload === 'yes') {
                state.newProducts = state.newProducts.filter((item) => item.isPublished)
            }

            if (action.payload === 'no') {
                state.newProducts = JSON.parse(localStorage.getItem(NEW_PRODUCTS) ?? '[]')
            }
        },

        updateNewProducts(state, action: PayloadAction<IProduct>) {
            state.newProducts = state.newProducts.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, ...action.payload }
                }

                return item
            })

            localStorage.setItem(NEW_PRODUCTS, JSON.stringify(state.newProducts))
        },

        removeNewProductById(state, action: PayloadAction<number>) {
            state.newProducts = state.newProducts.filter((item) => item.id !== +action.payload)
            localStorage.setItem(NEW_PRODUCTS, JSON.stringify(state.newProducts))
        }

        // removeFavourite(state, action: PayloadAction<string>) {
        //     state.newProducts = state.newProducts.filter((f) => f !== action.payload)
        //     localStorage.setItem(NEW_PRODUCTS, JSON.stringify(state.newProducts))
        // }
    }
})

export const newProductsActions = productsSlice.actions
export const newproductsReducer = productsSlice.reducer
