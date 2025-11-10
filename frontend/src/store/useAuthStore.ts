import {create} from 'zustand'
import axios from "axios";
import {API} from "@/config/app.ts";
import {LoginFormSchemaType} from "@/schema/auth.schema.ts";

const KEY_TOKEN = "token"
const KEY_REFRESH_TOKEN = "refreshToken"

interface AuthInfo {
    access_token: string
    refresh_token: string
}

interface UserInfo {
    name: string
    email: string
}

interface State {
    loading: boolean
    auth: null | AuthInfo
    user: null | UserInfo

    login: (data: LoginFormSchemaType) => Promise<void>
    logout: () => void
    me: () => void
    // oauth: () => void
    checkAuth: () => void
}

export const useAuthStore = create<State>()((set) => ({
    loading: false,
    auth: null,
    user: null,

    logout: () => {
        set(() => ({auth: null}))
        localStorage.removeItem(KEY_TOKEN)
        localStorage.removeItem(KEY_REFRESH_TOKEN)
    },

    login: async (data: LoginFormSchemaType) => {
        set(() => ({loading: true}))
        try {
            const response = await axios.post<{
                access_token: string,
                refresh_token: string
            }>(`${API.URL}/auth/login`, data)

            const {access_token, refresh_token} = response.data
            set(() => ({auth: {access_token, refresh_token}}))
            localStorage.setItem(KEY_TOKEN, access_token)
            localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token)
            console.log(response)
        } catch (error) {
            console.log("Error to login", error)
            throw error
        } finally {
            set(() => ({loading: false}))
        }
    },

    me: async () => {
        set(() => ({loading: true}))
        try {
            const response = await axios.get<{
                name: string,
                email: string
            }>(`${API.URL}/user/me`)

            const {name, email} = response.data
            set(() => ({user: {name, email}}))
            console.log(response)
        } catch (error) {
            console.log("Error to fetch me", error)
            throw error
        } finally {
            set(() => ({loading: false}))
        }
    },
    checkAuth: async () => {
        const access_token = localStorage.getItem(KEY_TOKEN)
        const refresh_token = localStorage.getItem(KEY_REFRESH_TOKEN)

        if (!access_token) return;
        if (!refresh_token) return;

        set(() => ({loading: true}))
        try {
            const response = await axios.get<{
                name: string,
                email: string
            }>(`${API.URL}/user/me`)

            const {name, email} = response.data
            set(() => ({user: {name, email}, auth: {access_token, refresh_token}}))
            console.log(response)
        } catch (error) {
            console.log("Error to checkAuth", error)
            set(() => ({user: null, auth: null}))
            throw error
        } finally {
            set(() => ({loading: false}))
        }
    }

}))
