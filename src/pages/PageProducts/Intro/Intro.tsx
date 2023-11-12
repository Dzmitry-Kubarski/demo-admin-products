import { ChangeEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, Switch } from '@mantine/core'
import classes from './Intro.module.css'
import ListProducts from '../../../features/products/ListProducts/ListProducts'
import Container from '../../../layouts/Container/Container'
import NewProducts from '../../../features/products/NewProducts/NewProducts'
import { useAppSelector } from '../../../hooks/use-selector'
import { useActions } from '../../../hooks/use-actions'

const variantTabs = {
    list: 'list',
    newList: 'newList'
} as const

const Intro = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const { toggleIsPublished } = useActions()
    const { isPublished } = useAppSelector((state) => state.newProductsList)
    const { isAuth } = useAppSelector((state) => state.user)

    const currentTabParam = searchParams.get('tab')
    const publishedParam = searchParams.get('published')

    const currentParams = Object.fromEntries([...searchParams])

    const handlerToggleIsPublished = (event: ChangeEvent<HTMLInputElement>) => {
        const published = event.currentTarget.checked ? 'yes' : 'no'
        setSearchParams({ ...currentParams, published })
        toggleIsPublished(published)
    }

    useEffect(() => {
        const publishedParam = searchParams.get('published')

        if (publishedParam) {
            toggleIsPublished(publishedParam === 'yes' ? 'yes' : 'no')
        }
    }, [searchParams])

    return (
        <section className={classes.Section}>
            <Container className={classes.Inner}>
                <div className={classes.Tabs}>
                    <Tabs
                        classNames={classes}
                        variant='unstyled'
                        defaultValue={variantTabs.list}
                        value={currentTabParam || variantTabs.list}
                        onChange={(value) => setSearchParams({ ...currentParams, tab: value || '' })}
                    >
                        {isAuth && (
                            <Tabs.List grow>
                                <Tabs.Tab value={variantTabs.list}>Список товаров</Tabs.Tab>
                                <Tabs.Tab value={variantTabs.newList}>Новые товары</Tabs.Tab>

                                {currentTabParam === variantTabs.newList && (
                                    <Switch
                                        className={classes.Switch}
                                        checked={publishedParam === 'yes' || isPublished === 'yes'}
                                        onChange={(event) => handlerToggleIsPublished(event)}
                                        label='Show published'
                                    />
                                )}
                            </Tabs.List>
                        )}

                        <Tabs.Panel value={variantTabs.list}>
                            <ListProducts />
                        </Tabs.Panel>

                        {isAuth && (
                            <Tabs.Panel value={variantTabs.newList}>
                                <NewProducts />
                            </Tabs.Panel>
                        )}
                    </Tabs>
                </div>
            </Container>
        </section>
    )
}

export default Intro
