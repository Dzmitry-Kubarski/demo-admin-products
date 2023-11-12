import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mantine/core'
import classes from './Header.module.css'
import IconLogo from '../../icons/IconLogo'
import { useAppSelector } from '../../hooks/use-selector'
import { useActions } from '../../hooks/use-actions'

interface IProps {}

const Header = ({}: IProps) => {
    const navigate = useNavigate()
    const { isAuth } = useAppSelector((state) => state.user)
    const { userLogin, userUnLogin } = useActions()

    return (
        <header className={classes.Wrap}>
            <div className={classes.Logo}>
                <IconLogo />
            </div>

            <nav className={classes.Links}>
                <Link to='/products/'>Каталог</Link>
                {isAuth && <Link to='/products/create/'>Добавить продукт</Link>}
            </nav>

            {!isAuth ? (
                <Button className={classes.Btn} variant='filled' onClick={() => userLogin()}>
                    Login
                </Button>
            ) : (
                <Button
                    className={classes.Btn}
                    variant='filled'
                    onClick={() => {
                        userUnLogin()
                        navigate('/products/')
                    }}
                >
                    Exit
                </Button>
            )}
        </header>
    )
}

export default Header
