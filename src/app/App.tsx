import { Routes, Route } from 'react-router-dom'
import PageProducts from '../pages/PageProducts/PageProducts'
import PageProductCreate from '../pages/PageProductCreate/PageProductCreate'
import PageProductDetail from '../pages/PageProductDetail/PageProductDetail'
import PageMain from '../pages/PageMain/PageMain'
import PageProductEdit from '../pages/PageProductEdit/PageProductEdit'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { useAppSelector } from '../hooks/use-selector'

function App() {
    const { isAuth } = useAppSelector((state) => state.user)

    return (
        <>
            {isAuth ? (
                <Routes>
                    <Route path='/' element={<PageMain />} />
                    <Route path='/products/' element={<PageProducts />} />
                    <Route path='/products/create' element={<PageProductCreate />} />
                    <Route path='/products/:id' element={<PageProductDetail />} />
                    <Route path='/products/edit/:id' element={<PageProductEdit />} />

                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path='/' element={<PageMain />} />
                    <Route path='/products/' element={<PageProducts />} />
                    <Route path='/products/:id' element={<PageProductDetail />} />

                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            )}
        </>
    )
}

export default App
