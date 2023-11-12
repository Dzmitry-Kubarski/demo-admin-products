import { Link } from 'react-router-dom'
import classes from './NotFoundPage.module.css'

const NotFoundPage = () => {
    return (
        <section className={classes.Section}>
            <h2 className={classes.Title}>Page not found</h2>

            <Link className={classes.Link} to='/products'>
                Go to the product catalog
            </Link>
        </section>
    )
}

export default NotFoundPage
