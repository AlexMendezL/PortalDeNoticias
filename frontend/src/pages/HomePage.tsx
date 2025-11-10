import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <div className="flex flex-col gap-3 my-auto mx-auto">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold"> Todo lo que necesitas saber, en un solo sitio</h1>
                <p className="text-lg md:text-xl lg:text-2xl">
                    Explora artículos, blogs y reportes que te mantienen informado y te ayudan a comprender el panorama
                    completo
                </p>
                <div className="flex items-start gap-2">
                    <Button size="lg" asChild>
                        <Link to="auth/login">
                                Ver lo más recientes
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link to="auth/signup">
                            Crear cuenta
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
