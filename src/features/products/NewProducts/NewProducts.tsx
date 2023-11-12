import { Table, Popover, Button } from '@mantine/core'
import cn from 'classnames'
import classes from './NewProducts.module.css'
import { useAppSelector } from '../../../hooks/use-selector'
import { Link } from 'react-router-dom'
import IconDelete from '../../../icons/IconDelete'
import { useActions } from '../../../hooks/use-actions'
import { useDeleteProductMutation } from '../../../store/products/products.api'

interface IProps {
    className?: string
}

const NewProducts = ({ className }: IProps) => {
    const { newProducts } = useAppSelector((state) => state.newProductsList)
    const { removeNewProductById } = useActions()
    const [deleteProduct, { isLoading, isError }] = useDeleteProductMutation()

    const handlerDeleteProduct = async (productId: number) => {
        const answer = await deleteProduct(productId)

        if (answer) {
            removeNewProductById(productId)
        }
    }

    const rows = newProducts.map((elem) => (
        <Table.Tr key={elem.id}>
            <Table.Td className={classes.Title}>{elem.title}</Table.Td>
            <Table.Td className={classes.Desc}>{elem.description}</Table.Td>
            <Table.Td>{elem.category}</Table.Td>
            <Table.Td>{elem.rating.rate}</Table.Td>
            <Table.Td>{elem.price}</Table.Td>
            <Table.Td>{elem.isPublished ? 'yes' : 'no'}</Table.Td>

            <Table.Td className={classes.Link}>
                <Link to={`/products/edit/${elem.id}`}>Edit</Link>
            </Table.Td>

            <Table.Td className={classes.Link}>
                <Popover trapFocus position='bottom' withArrow shadow='xs'>
                    <Popover.Target>
                        <Button size='xs' color='red' disabled={isLoading}>
                            <IconDelete className={classes.IconDelete} />
                        </Button>
                    </Popover.Target>

                    <Popover.Dropdown className={classes.Dropdown}>
                        <p>Confirm the deletion?</p>

                        <Button variant='filled' size='xs' onClick={() => handlerDeleteProduct(elem.id)} disabled={isLoading}>
                            Yes
                        </Button>
                    </Popover.Dropdown>
                </Popover>
            </Table.Td>
        </Table.Tr>
    ))

    if (!newProducts.length) {
        return <div className={classes.Empty}>Список пуст</div>
    }

    return (
        <div className={cn(classes.Wrap, className)}>
            {isError && <div className={classes.Error}>Error when creating a product</div>}

            <Table className={classes.Table}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th className={classes.Title}>Title</Table.Th>
                        <Table.Th className={classes.Desc}>Description</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Rating</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Published</Table.Th>
                        <Table.Th>Control</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody className={classes.TableBody}>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}

export default NewProducts
