type AppConfigType = {
  name: string,
  github: {
    title: string,
    url: string
  },
  author: {
    name: string,
    url: string
  },
}

type APIConfig = {
  URL: string
}

export const appConfig: AppConfigType = {
  name: import.meta.env.VITE_APP_NAME ?? "Portal de Noticias",
  github: {
    title: "React Shadcn Starter",
    url: "https://github.com/hayyi2/react-shadcn-starter",
  },
  author: {
    name: "hayyi",
    url: "https://github.com/hayyi2/",
  }
}

export const baseUrl = import.meta.env.VITE_BASE_URL ?? ""

export const API: APIConfig = {
  URL: import.meta.env.VITE_API_URL
}
