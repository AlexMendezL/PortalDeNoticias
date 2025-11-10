export interface Author {
    name: string
}

export interface NewsItem {
    id: number
    title: string
    image_url: string
    published_at: string
    updated_at: string
    news_site: string
    url: string
    summary: string
    authors: Author[]
}

export interface NewsResponse {
    next: string | null
    previous: string | null
    results: NewsItem[]
}
