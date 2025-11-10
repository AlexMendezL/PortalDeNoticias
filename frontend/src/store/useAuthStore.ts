import {create} from 'zustand'
import axios from "axios";
import {API} from "@/config/app.ts";
import {LoginFormSchemaType} from "@/schema/auth.schema.ts";
import {toast} from "sonner";

const KEY_TOKEN = "token"
const KEY_REFRESH_TOKEN = "refreshToken"

interface UserInfo {
    name: string
    email: string
}

interface AuthInfo {
    access_token: string
    refresh_token: string
    user: UserInfo
}


interface State {
    loading: boolean
    auth: null | AuthInfo

    login: (data: LoginFormSchemaType) => Promise<void>
    logout: () => void
    me: (access_token: string, refresh_token: string) => Promise<void>
    oauth: (access_token: string, refresh_token: string) => Promise<void>
    checkAuth: () => Promise<void>
}

export const useAuthStore = create<State>()((set, get) => ({
    loading: false,
    auth: null,


    checkAuth: async () => {
        set(() => ({loading: true}))
        const access_token = localStorage.getItem(KEY_TOKEN)
        const refresh_token = localStorage.getItem(KEY_REFRESH_TOKEN)

        if (!access_token || !refresh_token) {
            set(() => ({loading: false, auth: null}))
            return
        }
        try {
            await get().me(access_token, refresh_token)
        } catch (error) {
            throw error
        } finally {
            set(() => ({loading: false}))
        }
    },


    login: async (data: LoginFormSchemaType) => {
        set(() => ({loading: true}))
        try {
            const response = await axios.post<{
                access_token: string,
                refresh_token: string
            }>(`${API.URL}/auth/login`, data)

            const {access_token, refresh_token} = response.data
            await get().me(access_token, refresh_token)
            toast.success(`Bienvenido, ${get().auth?.user.name}`)
        } catch (error) {
            throw error
        } finally {
            set(() => ({loading: false}))
        }
    },

    logout: () => {
        set(() => ({auth: null}))
        localStorage.removeItem(KEY_TOKEN)
        localStorage.removeItem(KEY_REFRESH_TOKEN)
    },

    me: async (access_token: string, refresh_token: string) => {
        set(() => ({loading: true}))
        try {
            const response = await axios.get<{
                name: string,
                email: string
            }>(`${API.URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })

            const {name, email} = response.data
            set(() => ({auth: {access_token, refresh_token, user: {name, email}}}))
            localStorage.setItem(KEY_TOKEN, access_token)
            localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token)
        } catch (error) {
            set(() => ({auth: null}))
            throw error
        } finally {
            set(() => ({loading: false}))
        }
    },

    oauth: async (access_token: string, refresh_token: string) => {
        set(() => ({loading: true}))

        try {
            await get().me(access_token, refresh_token)
            toast.success(`Bienvenido, ${get().auth?.user.name}!`)
        } catch (error) {
            throw error
        } finally {
            set(() => ({loading: false}))
        }
    }
}))
