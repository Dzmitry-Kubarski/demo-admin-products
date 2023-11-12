import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Title, TextInput, Checkbox, Button, Group, Box, NumberInput, Popover } from '@mantine/core'
import { useForm } from '@mantine/form'
import cn from 'classnames'
import classes from './Intro.module.css'
import Container from '../../../layouts/Container/Container'
import { useDeleteProductMutation, useUpdateProductMutation } from '../../../store/products/products.api'
import { IProduct } from '../../../features/products/types'
import { useActions } from '../../../hooks/use-actions'
import { useAppSelector } from '../../../hooks/use-selector'

interface IProps {
    className?: string
}

const Intro = ({ className }: IProps) => {
    const params = useParams()
    const navigate = useNavigate()

    const { updateNewProducts, removeNewProductById } = useActions()
    const { newProducts } = useAppSelector((state) => state.newProductsList)

    const [updateProduct, { isLoading, isError, isSuccess }] = useUpdateProductMutation()
    const [deleteProduct, { isLoading: isLoadingDelete, isError: isErrorDelete }] = useDeleteProductMutation()

    const [isEmpty, setIsEmpty] = useState(false)

    const form = useForm({
        initialValues: {
            title: '',
            price: 0,
            description: '',
            category: '',
            isPublished: false
        },

        validate: {
            title: (value) => (value.trim().length < 5 ? 'Title must have at least 5 letters' : null),
            price: (value) => (!isNaN(+value) && +value > 0 ? null : 'The cost must be greater than zero'),
            description: (value) => (value.trim().length < 20 ? 'Description must have at least 5 letters' : null),
            category: (value) => (value.trim().length < 5 ? 'Category must have at least 5 letters' : null)
        }
    })

    const handlerDeleteProduct = async () => {
        if (params?.id) {
            const answer = await deleteProduct(Number(params?.id))

            if (answer) {
                removeNewProductById(Number(params?.id))
                navigate(`/products?tab=newList`)
            }
        }
    }

    const handlerUpdateProduct = async () => {
        const product = form.values as IProduct
        const answer = await updateProduct(product)

        if (answer) {
            updateNewProducts(product)
        }
    }

    useEffect(() => {
        if (params.id) {
            const elem = newProducts.find((item) => item.id === Number(params.id)) || null

            if (elem) {
                form.setValues(elem)
            } else {
                setIsEmpty(true)
            }
        }
    }, [])

    return (
        <section className={cn(classes.Section, className)}>
            <Container>
                <Title className={classes.Title} order={2}>
                    Edit product
                </Title>

                <Link className={classes.LinkBack} to={'/products?tab=newList'}>
                    Go back to the table
                </Link>

                {!isEmpty ? (
                    <Box maw={340} mx='auto'>
                        <form onSubmit={form.onSubmit(handlerUpdateProduct)}>
                            <TextInput withAsterisk label='Title' placeholder='title' {...form.getInputProps('title')} />
                            <NumberInput label='Price' description='Price' placeholder='Price' {...form.getInputProps('price')} />
                            <TextInput withAsterisk label='Description' placeholder='description' {...form.getInputProps('description')} />
                            <TextInput withAsterisk label='Category' placeholder='category' {...form.getInputProps('category')} />

                            <Checkbox mt='md' label='Publish a product' {...form.getInputProps('isPublished', { type: 'checkbox' })} />

                            <Group justify='center' mt='md'>
                                <Popover trapFocus position='bottom' withArrow shadow='xs'>
                                    <Popover.Target>
                                        <Button type='button' disabled={isLoadingDelete} color='red'>
                                            Delete product
                                        </Button>
                                    </Popover.Target>

                                    <Popover.Dropdown className={classes.Dropdown}>
                                        <p>Confirm the deletion?</p>

                                        <Button variant='filled' size='xs' onClick={handlerDeleteProduct} disabled={isLoadingDelete}>
                                            Yes
                                        </Button>
                                    </Popover.Dropdown>
                                </Popover>

                                <Button type='submit' disabled={isLoading}>
                                    Update product
                                </Button>
                            </Group>
                        </form>
                    </Box>
                ) : (
                    <p className={classes.Empty}>Продукт не найден</p>
                )}

                {isSuccess && <div className={classes.Success}>The product has been successfully updated</div>}
                {(isError || isErrorDelete) && <div className={classes.Error}>An error has occurred</div>}
            </Container>
        </section>
    )
}

export default Intro
