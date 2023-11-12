import { ReactNode } from 'react'
import classes from './MainLayout.module.css'
import Header from '../../widgets/Header/Header'
import Footer from '../../widgets/Footer/Footer'

interface IProps {
    children: ReactNode
}

const MainLayout = ({ children }: IProps) => {
    return (
        <div className={classes.Wrap}>
            <Header />

            {children}

            <Footer />
        </div>
    )
}

export default MainLayout
