import { Link } from 'react-router-dom'
import cn from 'classnames'
import classes from './CardProduct.module.css'
import { IProduct } from '../../types'

const emptyImage = 'https://i.ibb.co/PYy9Q3j/photo-empty-min.jpg'

interface IProps {
    product: IProduct
    className?: string
}

const CardProduct = ({ className, product }: IProps) => {
    const imageUrl = product?.image || emptyImage

    return (
        <Link className={cn(classes.Card, className)} to={`/products/${product.id}`} key={product.id}>
            <div className={classes.CardImageWrap}>
                <img src={imageUrl} alt={product.title} />
            </div>

            <h4 className={classes.CardTitle} title={product.title}>
                {product.title}
            </h4>

            <p className={classes.CardPrice}>
                Цена: <span>{product.price}</span>
            </p>
        </Link>
    )
}

export default CardProduct
