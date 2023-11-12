import { Link } from 'react-router-dom'
import classes from './ErrorPage.module.css'

const ErrorPage = () => {
    return (
        <section className={classes.Section}>
            <h2 className={classes.Title}>Error....</h2>

            <Link className={classes.Link} to='/products'>
                Go to the product catalog
            </Link>
        </section>
    )
}

export default ErrorPage
