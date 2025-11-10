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
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import axios from "axios";
import {API} from "@/config/app.ts";
import {toast} from "sonner"
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";
import {forgotPasswordConfirmFormSchema, ForgotPasswordConfirmFormSchemaType} from "@/schema/auth.schema.ts";


export default function ForgetPasswordConfirmPage() {
    const [searchParams] = useSearchParams()
    const naviage = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<ForgotPasswordConfirmFormSchemaType>({
        resolver: zodResolver(forgotPasswordConfirmFormSchema)
    })
    const token = searchParams.get("token")

    if (!token || token.length < 50) {
        naviage("/")
        return
    }

    const onSubmit = async (data: ForgotPasswordConfirmFormSchemaType) => {
        setIsLoading(true)
        try {
            await axios.post(`${API.URL}/auth/forget_password_confirm`, {...data, token})
            toast.success('Contraseña reseteada correctamente')
            naviage('/auth/login')
        } catch (e) {
            toast.error('Error, al resetear contraseña', {description: 'Intenta iniciar de nuevo la solicitud'})
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="my-auto flex flex-col w-[100%] sm:w-[80%] gap-5 mx-auto">

                <h1 className="font-bold text-4xl">Restaurar contraseña</h1>
                <p className="text-lg">
                    Ingrese una nueva contrasñe para resetearla
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*******" {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirmar contraseña</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*******" {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading && <Spinner/>}
                            Resetear contraseña
                        </Button>
                    </form>
                </Form>
                <Separator/>
                <div className="text-center mt-8">
                    <span> ¿Ya tienes una cuenta?  </span>
                    <Link to="/auth/login" className="font-semibold">
                        Inicia sesión
                    </Link>
                </div>
            </div>
        </>
    )
}
