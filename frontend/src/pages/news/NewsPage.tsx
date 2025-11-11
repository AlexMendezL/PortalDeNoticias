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
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Newspaper} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function NewsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("articles");

    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState<NewsItem[]>([])
    const [next, setNext] = useState<string | null>(null)
    const [previous, setPrevious] = useState<string | null>(null)
    const auth = useAuthStore((state) => state.auth)

    const getData = useCallback(async (url: string | null) => {
        setLoading(true)
        setNews([])
        const urlFinal = url ? url : `${API.URL}/news/newsByCategory/${selectedCategory}`

        try {
            const response = await axios.get<NewsResponse>(urlFinal, {
                headers: {
                    Authorization: `Bearer ${auth?.access_token}`,
                },
            })
            console.log(response.data)
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
    }, [auth?.access_token, selectedCategory])

    useEffect(() => {
        getData(null)
    }, [getData])


    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Últimas noticias</PageHeaderHeading>
            </PageHeader>

            <Card className="z-9 mb-8">
                <CardHeader>
                    <CardTitle>Categorias disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                    <ToggleGroup
                        type="single"
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                        variant="outline"
                        spacing={2}
                        size="lg"
                    >
                        <ToggleGroupItem
                            value="articles"
                            aria-label="Toggle star"
                            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:stroke-yellow-500"
                        >
                            <Newspaper />
                            Artículos
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="blogs"
                            aria-label="Toggle heart"
                            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:stroke-orange-500"
                        >
                            <Newspaper />
                            Blogs
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="reports"
                            aria-label="Toggle bookmark"
                            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:stroke-blue-500"
                        >
                            <Newspaper />
                            Reportes
                        </ToggleGroupItem>
                    </ToggleGroup>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                {loading &&
                    Array.from({length: 5})
                        .map((_, index) => <NewsCardSkeletonComponent index={index}/>)
                }
                {news.length > 0 &&
                    news.map((item) => <NewsCardComponent news={item} category={selectedCategory}/>)
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
