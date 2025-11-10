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
import {signUpFormSchema, SignUpFormSchemaType} from "@/schema/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import axios from "axios";
import {API} from "@/config/app.ts";
import {toast} from "sonner"
import {Separator} from "@/components/ui/separator.tsx";
import {Link, useNavigate} from "react-router-dom";
import ButtonSocialGoogle from "@/components/button-social-google.tsx";
import ButtonSocialFacebook from "@/components/button-social-facebook.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";


export default function SignupPage() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<SignUpFormSchemaType>({
        resolver: zodResolver(signUpFormSchema)
    })

    const onSubmit = async (data: SignUpFormSchemaType) => {
        setIsLoading(true)
        try {
            await axios.post(`${API.URL}/auth/signup`, data)
            toast.success('Registro realizado correctamente')
            navigate('/auth/login')
        } catch (e) {
            toast.error('Error al registrarse', {
                description: 'Si el error continua, comuníquese con soporte@portal-noticias.com'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="my-auto flex flex-col gap-5 mx-auto">

                <h1 className="font-bold text-4xl">Únase a Portal de noticias</h1>
                <p className="text-lg">
                    Indique su nombre, una dirección de correo electrónico y contraseña para crear una cuenta
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mi nombre" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="accept_term"
                            render={({field}) => (
                                <FormItem>
                                    {/*<FormLabel>Confirmar contraseña</FormLabel>*/}
                                    <FormControl>
                                        <div className="flex items-start gap-3">
                                            <Checkbox id="terms-2" checked={field.value}
                                                      onCheckedChange={field.onChange}
                                            />
                                            <div className="grid gap-2">
                                                <Label htmlFor="terms-2">
                                                    Acepto terminos y condiciones
                                                </Label>
                                                <p className="text-muted-foreground text-sm">
                                                    Estoy de acuerdo con los Términos y condiciones y la Política de
                                                    privacidad de Portal de noticias.
                                                </p>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading && <Spinner/>}
                            Crear cuenta
                        </Button>
                    </form>
                </Form>
                <Separator/>
                <p className="text-center text-sm">
                    Otras opciones para crear una cuenta.
                </p>
                <div className="flex gap-3 flex-col sm:flex-row">
                    <ButtonSocialGoogle/>
                    <ButtonSocialFacebook/>
                </div>
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
