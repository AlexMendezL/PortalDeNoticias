import {
    Files,
    Gauge,
    LucideIcon
} from 'lucide-react'

type MenuItemType = {
    title: string
    url: string
    external?: string
    icon?: LucideIcon
    items?: MenuItemType[]
    authRequired: boolean
}
type MenuType = MenuItemType[]

export const mainMenu: MenuType = [
    {
        title: 'Inicio',
        url: '/',
        icon: Gauge,
        authRequired: false
    },
    {
        title: 'Noticias',
        url: '/news',
        icon: Files,
        authRequired: true
    },
]
