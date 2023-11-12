export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image?: string
    rating: {
        rate: number
        count: number
    }
    isPublished?: boolean
}

export const NEW_PRODUCTS = 'demo_new_products'
