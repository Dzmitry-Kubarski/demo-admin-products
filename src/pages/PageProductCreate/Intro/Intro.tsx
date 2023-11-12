import { Title, TextInput, Checkbox, Button, Group, Box, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import cn from 'classnames'
import classes from './Intro.module.css'
import Container from '../../../layouts/Container/Container'
import { useCreateProductMutation } from '../../../store/products/products.api'
import { IProduct } from '../../../features/products/types'
import { useActions } from '../../../hooks/use-actions'
import { Link } from 'react-router-dom'

interface IProps {
    className?: string
}

type TNewproduct = Pick<IProduct, 'title' | 'price' | 'description' | 'category'> & { isPublished: boolean }

const Intro = ({ className }: IProps) => {
    const { addNewProduct } = useActions()
    const [createProduct, { isLoading, isError, isSuccess }] = useCreateProductMutation()

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

    const handlerCreateProduct = async (obj: TNewproduct) => {
        const result = {
            ...obj,
            price: +obj.price,
            id: Date.now(),
            rating: { rate: 0, count: 0 },
            image: ''
        } as IProduct

        const answer = await createProduct(result)

        if (answer) {
            addNewProduct(result)
            form.reset()
        }
    }

    return (
        <section className={cn(classes.Section, className)}>
            <Container>
                <Title className={classes.Title} order={2}>
                    Creating a new product
                </Title>

                <Link className={classes.LinkBack} to={'/products?tab=newList'}>
                    Go to the table
                </Link>

                <Box maw={340} mx='auto'>
                    <form onSubmit={form.onSubmit((values) => handlerCreateProduct(values))}>
                        <TextInput withAsterisk label='Title' placeholder='title' {...form.getInputProps('title')} />
                        <NumberInput label='Price' description='Price' placeholder='Price' {...form.getInputProps('price')} />
                        <TextInput withAsterisk label='Description' placeholder='description' {...form.getInputProps('description')} />
                        <TextInput withAsterisk label='Category' placeholder='category' {...form.getInputProps('category')} />

                        <Checkbox mt='md' label='Publish a product' {...form.getInputProps('isPublished', { type: 'checkbox' })} />

                        <Group justify='flex-end' mt='md'>
                            <Button type='submit' disabled={isLoading}>
                                Create product
                            </Button>
                        </Group>
                    </form>
                </Box>

                {isSuccess && <div className={classes.Success}>The product was successfully created</div>}
                {isError && <div className={classes.Error}>Error when creating a product</div>}
            </Container>
        </section>
    )
}

export default Intro
