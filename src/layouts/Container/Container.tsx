import { ReactNode } from 'react'
import classes from './Container.module.css'
import cn from 'classnames'

interface IProps {
    children: ReactNode
    className?: string
}

const Container = ({ children, className }: IProps) => {
    return <div className={cn(classes.Wrap, className)}>{children}</div>
}

export default Container
