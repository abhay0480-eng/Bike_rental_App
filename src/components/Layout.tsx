
import { Footer } from './Footer'
import { Header } from './Header'
import { Outlet } from 'react-router'

export const Layout = () => {
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <Header />
                <main className="grow">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>

    )
}