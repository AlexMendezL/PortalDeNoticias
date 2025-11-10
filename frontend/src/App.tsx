import {BrowserRouter, HashRouter} from 'react-router'
import {ThemeProvider} from './contexts/ThemeContext'
import Router from './Router'
import {useAuthStore} from "@/store/useAuthStore.ts";
import {useEffect} from "react";

const AppRouter = import.meta.env.VITE_USE_HASH_ROUTE === 'true' ? HashRouter : BrowserRouter

export default function App() {
    const checkAuth = useAuthStore((state) => state.checkAuth)
    const loading= useAuthStore((state) => state.loading)

    useEffect(() => {
        const init = async () => {
            await checkAuth()
        }
        init()
    }, [checkAuth])

    if (loading) return <div>loading</div>

    return (
        <ThemeProvider>
            <AppRouter>
                <Router/>
            </AppRouter>
        </ThemeProvider>
    )
}
