import {Card, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {CalendarClock, ChevronRight, Globe, User} from "lucide-react";
import * as React from "react";
import {parseISO, format} from "date-fns";
import {es} from "date-fns/locale/es";
import {NewsItem, NewsResponse} from "@/types/news.types.ts";
import NewsDetailSkeletonComponent from "@/components/news/news-detail-skeleton.tsx";
import NewsRelatedComponent from "@/components/news/news-related.tsx";
import {useEffect, useState} from "react";
import {useAuthStore} from "@/store/useAuthStore.ts";
import axios from "axios";
import {API} from "@/config/app.ts";
import NewsRelatedSkeletonComponent from "@/components/news/news-related-skeleton.tsx";

type NewDetailComponentProps = {
    news: NewsItem | null
    category: string
}

const NewsDetailComponent: React.FC<NewDetailComponentProps> = ({news, category}) => {

    if (!news) {
        return (
            <>
                <NewsDetailSkeletonComponent/>
                <NewsRelatedSkeletonComponent/>
            </>
        )
    }

    const auth = useAuthStore((state) => state.auth)
    const date = parseISO(news.published_at)
    const formattedDate = format(date, 'd MMM yyyy h:mm a', {locale: es})

    const [relatedNews, setRelatedNews] = useState<NewsItem[] | null>(null)


    const getData = async () => {
        try {
            const response = await axios.get<NewsResponse>(`${API.URL}/news/relatedNews/${category}/${news.news_site}`, {
                headers: {Authorization: `Bearer ${auth?.access_token}`}
            })
            setRelatedNews(response.data.results.filter(item => item.id !== news.id))
            console.log(response.data)
        } catch (e) {
            console.error('Error to fetch news detail', e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-6 content-center">
                <div>
                    <img
                        src={news.image_url}
                        alt='image'
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <Card>
                    <CardHeader className="flex flex-col gap-5">

                        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
                            {news.title}
                        </h1>

                        <p className="leading-7">
                            {news.summary}
                        </p>

                        <div className="flex gap-3 text-sm flex-wrap">
                            <div className="flex gap-0.5 text-sm items-center">
                                <User size={18}/>
                                <p>{news.authors.length > 0 ? news.authors[0].name : 'N/A'}</p>
                            </div>
                            <div className="flex gap-0.5 items-center">
                                <CalendarClock size={18}/>
                                <p>{formattedDate}</p>
                            </div>
                            <div className="flex gap-0.5 items-center">
                                <Globe size={18}/>
                                <p>{news.news_site}</p>
                            </div>
                        </div>

                        <Button asChild className="w-max">
                            <Link to={news.url} target="_blank" rel="noopener noreferrer">
                                Ir a la noticia oficial <ChevronRight/>
                            </Link>
                        </Button>
                    </CardHeader>
                </Card>
            </div>
            <NewsRelatedComponent news={relatedNews} category={category}/>
        </>

    )
}
export default NewsDetailComponent;
