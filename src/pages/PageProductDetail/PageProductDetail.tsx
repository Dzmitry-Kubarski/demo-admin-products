import { useParams } from 'react-router-dom'
import { useLazyGetProductByIdQuery } from '../../store/products/products.api'
import { useEffect, useState } from 'react'
import { Badge } from '@mantine/core'
import classes from './PageProductDetail.module.css'
import Container from '../../layouts/Container/Container'

const PageProductDetail = () => {
    const params = useParams()

    const [incorrectId, setIncorrectId] = useState(false)

    const [fethProductById, { isLoading, isError, data }] = useLazyGetProductByIdQuery()

    useEffect(() => {
        if (params.id && !isNaN(+params.id) && !isNaN(parseFloat(params.id))) {
            fethProductById(+params.id)
            return
        } else {
            setIncorrectId(true)
        }
    }, [params.id])

    if (isLoading) return <div className={classes.Loading}>Loading...</div>
    if (isError) return <div className={classes.Error}>Error...</div>
    if (incorrectId) return <div className={classes.Error}>Некоректный айди...</div>

    return (
        <div className={classes.Wrap}>
            <Container>
                <div className={classes.Inner}>
                    <div className={classes.ImageWrap}>
                        <img src={data?.image} alt={data?.title} />
                    </div>

                    <div className={classes.Content}>
                        <h2 className={classes.Title}>{data?.title}</h2>

                        <div className={classes.Row}>
                            <Badge className={classes.Category} color='violet'>
                                {data?.category}
                            </Badge>

                            <Badge className={classes.Rating} color='orange'>
                                Rating: {data?.rating.rate}
                            </Badge>
                        </div>

                        <p className={classes.Desc}>{data?.description}</p>

                        <p className={classes.Price}>
                            Price: <span>{data?.price}</span>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PageProductDetail
