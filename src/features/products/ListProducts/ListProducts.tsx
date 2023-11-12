import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Input, Select, Pagination } from '@mantine/core'
import cn from 'classnames'
import classes from './ListProducts.module.css'
import CardProduct from '../ui/CardProduct/CardProduct'
import { useLazyGetAllProductsQuery } from '../../../store/products/products.api'
import { useDebounce } from '../../../hooks/use-debounce'

interface IProps {
    className?: string
}

const ListProducts = ({ className }: IProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')

    const debounced = useDebounce(search)
    const [getAllProducts, { isLoading, isError, data }] = useLazyGetAllProductsQuery()

    const currentParams = Object.fromEntries([...searchParams])
    let categoryRef = useRef(searchParams.get('category'))

    const onChangeFilter = (value: string | null) => {
        const category = value || ''
        setSearchParams({ ...currentParams, category })
        getAllProducts({ limit: 8, search, filterByCategory: value || '' })
    }

    const onChangeSort = (value: string | null) => {
        getAllProducts({ limit: 8, search, sort: value || '', filterByCategory: categoryRef.current || '' })
    }

    const helperGetPortionProducts = (limit: number) => {
        setSearchParams({})
        categoryRef.current = null
        getAllProducts({ limit })
    }

    useEffect(() => {
        getAllProducts({ limit: 8, search, sort: '', filterByCategory: categoryRef.current || '' })
    }, [debounced])

    if (isLoading) return <div className={classes.Loading}>Loading...</div>
    if (isError) return <div>Error...</div>

    if (!data?.length) {
        return <div>The list is empty</div>
    }

    return (
        <>
            <div className={cn(classes.Filter, className)}>
                <div className={classes.CountItems}>
                    <Button variant='filled' onClick={() => helperGetPortionProducts(8)}>
                        8
                    </Button>
                    <Button variant='filled' onClick={() => helperGetPortionProducts(16)}>
                        16
                    </Button>
                    <Button variant='filled' onClick={() => helperGetPortionProducts(20)}>
                        20
                    </Button>
                </div>

                <Input
                    className={classes.Search}
                    placeholder='product search'
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />

                <div className={classes.Filtered}>
                    <Select
                        placeholder='filter by category:'
                        data={[
                            { value: 'electronics', label: 'electronics' },
                            { value: "women's clothing", label: 'womens' },
                            { value: "men's clothing", label: 'mens' },
                            { value: 'jewelery', label: 'jewelery' }
                        ]}
                        defaultValue={categoryRef.current}
                        clearable
                        onChange={(data) => onChangeFilter(data)}
                    />
                </div>

                <div className={classes.Sort}>
                    <Select
                        placeholder='Sorting options:'
                        data={[
                            { value: 'price&_order=asc', label: 'Expensive' },
                            { value: 'price&_order=desc', label: 'Inexpensive' },
                            { value: 'rating.rate&_order=desc', label: 'Popular' }
                        ]}
                        clearable
                        onChange={(data) => onChangeSort(data)}
                    />
                </div>
            </div>

            <div className={cn(classes.Wrap, className)}>
                {data?.map((item) => (
                    <CardProduct product={item} key={item.id} />
                ))}
            </div>

            <Pagination total={3} onChange={(page) => getAllProducts({ page })} />
        </>
    )
}

export default ListProducts
