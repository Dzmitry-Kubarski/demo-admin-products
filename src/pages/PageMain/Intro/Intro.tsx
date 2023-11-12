import { Link } from 'react-router-dom'
import classes from './Intro.module.css'
import Container from '../../../layouts/Container/Container'

const Intro = () => {
    return (
        <section className={classes.Section}>
            <Container>
                <h2 className={classes.Title}>Admin panel for managing products</h2>
                <p className={classes.Desc}>To add and edit products, you need to log in to the application</p>

                <Link className={classes.Link} to='/products/'>
                    Go to the catalog page
                </Link>
            </Container>
        </section>
    )
}

export default Intro
