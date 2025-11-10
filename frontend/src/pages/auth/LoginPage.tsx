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
import {loginFormSchema, LoginFormSchemaType} from "@/schema/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import axios from "axios";
import {API} from "@/config/app.ts";
import {toast} from "sonner"
import {Separator} from "@/components/ui/separator.tsx";
import {Link} from "react-router-dom";
import ButtonSocialGoogle from "@/components/button-social-google.tsx";
import ButtonSocialFacebook from "@/components/button-social-facebook.tsx";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema)
    })

    const onSubmit = async (data: LoginFormSchemaType) => {
        setIsLoading(true)
        try {
            const response = await axios.post(`${API.URL}/auth/login`, data)
            console.log(response)
        } catch (e) {
            toast.error('Correo o contraseña inválida')
        } finally {
            setIsLoading(false)
        }
        console.log(data)
    }

    return (
        <>
            <div className="my-auto flex flex-col gap-5 mx-auto">

                <h1 className="font-bold text-4xl">Bienvenido de nuevo</h1>
                <p className="text-lg">Indique la dirección de correo electrónico asociada con su cuenta y la contraseña
                    para iniciar sesión</p>
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
                        <div className="flex justify-end my-0.5">
                            <Link to="/auth/forgetPassword" className="text-sm font-semibold">Olvide mi
                                contraseña</Link>
                        </div>
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading && <Spinner/>}
                            Iniciar sesión
                        </Button>
                    </form>
                </Form>
                <Separator/>
                <p className="text-center text-sm">
                    Otras opciones para iniciar sesión
                </p>
                <div className="flex gap-3 flex-col sm:flex-row">
                    <ButtonSocialGoogle/>
                    <ButtonSocialFacebook/>
                </div>
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
