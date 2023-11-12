import classes from './Footer.module.css'

interface IProps {}

const Footer = ({}: IProps) => {
    return (
        <footer className={classes.Wrap}>
            <p className={classes.Text}>All rights reserved, 2023</p>

            <a className={classes.Author} href='https://github.com/Dzmitry-Kubarski' target='_blank' rel='noopener noreferrer'>
                Create by Dzmitry
            </a>
        </footer>
    )
}

export default Footer
