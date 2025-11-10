import {useEffect} from "react"
import {useSearchParams, useNavigate} from "react-router-dom"
import {useAuthStore} from "@/store/useAuthStore.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {toast} from "sonner";

export default function AuthSocialCallbackPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const oauth = useAuthStore((state) => state.oauth)
    const loading = useAuthStore((state) => state.loading)

    useEffect(() => {
        const access_token = searchParams.get("access_token")
        const refresh_token = searchParams.get("refresh_token")

        if (access_token && refresh_token) {
            oauth(access_token, refresh_token)
                .then(() => {
                    navigate("/news")
                })
                .catch((error) => {
                    console.error("Error en el callback OAuth:", error)
                    toast.error("Error al iniciar sesión")
                    navigate("/auth/login")
                })
        } else {
            console.warn("No se encontraron tokens en la URL")
            navigate("/auth/login")
        }
    }, [searchParams, oauth, navigate])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading &&
                <>
                    <Spinner/>
                    <p className="text-lg font-medium">Procesando autenticación...</p>
                </>
            }
        </div>
    )
}
