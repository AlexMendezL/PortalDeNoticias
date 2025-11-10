import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {forgotFormSchema, ForgotFormSchemaType} from "@/schema/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import axios from "axios";
import {API} from "@/config/app.ts";
import {toast} from "sonner"
import {Separator} from "@/components/ui/separator.tsx";
import {Link, useNavigate} from "react-router-dom";

export default function ForgetPasswordPage() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<ForgotFormSchemaType>({
        resolver: zodResolver(forgotFormSchema)
    })

    const onSubmit = async (data: ForgotFormSchemaType) => {
        setIsLoading(true)
        try {
            await axios.post(`${API.URL}/auth/forget_password`, data)
            toast.success('Solicitud de recuperación enviado', {
                description: 'Revise bandeja de entrada o span y continue con el proceso indicado en el coreo'
            })
            navigate("/")
        } catch (e) {
            toast.error('Error al enviar el correo', {
                description: 'Si el error continua, comuníquese con soporte@portal-noticias.com'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="my-auto flex flex-col gap-6 mx-auto w-[100%] sm:w-[80%]">

                <h1 className="font-bold text-4xl">Restaurar contraseña</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="user@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading && <Spinner/>}
                            Iniciar sesión
                        </Button>
                    </form>
                </Form>
                <Separator/>
                <div className="text-center mt-8">
                    <span> ¿Aún no tienes una cuenta? </span>
                    <Link to="/auth/signup" className="font-semibold">
                        Cree su cuenta aquí
                    </Link>
                </div>
            </div>
        </>
    )
}
