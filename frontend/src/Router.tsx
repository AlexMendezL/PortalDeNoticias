import {Routes, Route} from 'react-router-dom'
import {AppLayout} from './components/app-layout'
import NotMatch from './pages/NotMatch'
import HomePage from './pages/HomePage.tsx'
import NewsPage from './pages/news/NewsPage.tsx'
import LoginPage from "@/pages/auth/LoginPage.tsx";
import SignupPage from "@/pages/auth/SignupPage.tsx";
import ForgetPasswordPage from "@/pages/auth/ForgetPassword.tsx";
import ForgetPasswordConfirmPage from "@/pages/auth/ForgetPasswordConfirm.tsx";
import ProtectedRoute from "@/components/auht/ProtectedRoute.tsx";
import PublicRoute from "@/components/auht/PublicRoute.tsx";

export default function Router() {
    return (
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="" element={<HomePage/>}/>
                <Route path="news" element={
                    <ProtectedRoute>
                        <NewsPage/>
                    </ProtectedRoute>
                }/>
                <Route
                    path="auth/*"
                    element={
                        <PublicRoute>
                            <Routes>
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="signup" element={<SignupPage/>}/>
                                <Route path="forgetPassword" element={<ForgetPasswordPage/>}/>
                                <Route path="forgetPasswordConfirm" element={<ForgetPasswordConfirmPage/>}/>
                            </Routes>
                        </PublicRoute>
                    }
                />
                <Route path="*" element={<NotMatch/>}/>
            </Route>
        </Routes>
    )
}
