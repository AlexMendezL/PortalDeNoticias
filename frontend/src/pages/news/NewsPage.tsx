import {PageHeader, PageHeaderHeading} from "@/components/page-header.tsx";
import NewsCardSkeletonComponent from "@/components/news/new-card-skeleton.tsx";
import {useCallback, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {API} from "@/config/app.ts";
import {useAuthStore} from "@/store/useAuthStore.ts";
import {NewsItem, NewsResponse} from "@/types/news.types.ts";
import NewsCardComponent from "@/components/news/new-card.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

export default function NewsPage() {
    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState<NewsItem[]>([])
    const [next, setNext] = useState<string | null>(null)
    const [previous, setPrevious] = useState<string | null>(null)
    const auth = useAuthStore((state) => state.auth)

    const getData = useCallback(async (url: string | null) => {
        setLoading(true)
        setNews([])
        const urlFinal = url ? url : `${API.URL}/news/news`

        try {
            const response = await axios.get<NewsResponse>(urlFinal, {
                headers: {
                    Authorization: `Bearer ${auth?.access_token}`,
                },
            })
            setNews(response.data.results)
            setNext(response.data.next)
            setPrevious(response.data.previous)
            window.scrollTo({top: 0, behavior: 'smooth'})
        } catch (e: unknown) {
            const axiosError = e as AxiosError
            if (axios.isAxiosError(axiosError)) {
                if (axiosError.response?.status === 401) console.log("No autorizado")

            }
        } finally {
            setLoading(false)
        }
    }, [auth?.access_token])

    useEffect(() => {
        getData(null)
    }, [getData])


    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Últimas noticias</PageHeaderHeading>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                {loading &&
                    Array.from({length: 5})
                        .map((_, index) => <NewsCardSkeletonComponent key={index}/>)
                }
                {news.length > 0 &&
                    news.map((item) => <NewsCardComponent news={item} category={"articles"}/>)
                }
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => getData(previous)}
                            className={`${!previous || loading ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => getData(next)}
                            className={`${!next || loading ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>


        </>
    )
}
