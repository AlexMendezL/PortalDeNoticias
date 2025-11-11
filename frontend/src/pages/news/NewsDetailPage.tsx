import NewsDetailComponent from "@/components/news/news-detail.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {NewsItem} from "@/types/news.types.ts";
import axios from "axios";
import {API} from "@/config/app.ts";
import {useAuthStore} from "@/store/useAuthStore.ts";
import {PageHeader, PageHeaderHeading} from "@/components/page-header.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft} from "lucide-react";
import * as React from "react";

export default function NewsDetailPage() {
    const {category, id} = useParams()

    const auth = useAuthStore((state) => state.auth)

    const [news, setNews] = useState<NewsItem | null>(null)

    const getData = async () => {
        setNews(null)
        try {
            const response = await axios.get<NewsItem>(`${API.URL}/news/detail/${category}/${id}`, {
                headers: {Authorization: `Bearer ${auth?.access_token}`}
            })
            setNews(response.data)
        } catch (e) {
            console.error('Error to fetch news detail', e)
        }
    }

    useEffect(() => {
        getData()
    }, [category, id])

    return (
        <div>
            <PageHeader>
                <PageHeaderHeading className="flex items-center gap-2">
                    <Button size="icon" variant="outline">
                        <Link to="/news"><ChevronLeft /></Link>
                    </Button>
                    Detalle de noticia
                </PageHeaderHeading>
            </PageHeader>
            <NewsDetailComponent news={news} category={category ?? ''}/>
        </div>
    )
}
