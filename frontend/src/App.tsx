import {BrowserRouter, HashRouter} from 'react-router'
import {ThemeProvider} from './contexts/ThemeContext'
import Router from './Router'
import {useAuthStore} from "@/store/useAuthStore.ts";
import {useEffect, useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";

const AppRouter = import.meta.env.VITE_USE_HASH_ROUTE === 'true' ? HashRouter : BrowserRouter

export default function App() {
    const [initDone, setInitDone] = useState(false)
    const checkAuth = useAuthStore((state) => state.checkAuth)

    useEffect(() => {
        checkAuth()
            .catch(() => {
                console.log("Without session")
            })
            .finally(() => setInitDone(true))
    }, [checkAuth])

    if (!initDone) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner/>
            </div>
        )
    }
    return (
        <ThemeProvider>
            <AppRouter>
                <Router/>
            </AppRouter>
        </ThemeProvider>
    )
}
