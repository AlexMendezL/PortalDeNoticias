import NewsDetailComponent from "@/components/news/news-detail.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {NewsItem} from "@/types/news.types.ts";
import axios from "axios";
import {API} from "@/config/app.ts";
import {useAuthStore} from "@/store/useAuthStore.ts";

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
        <>
            <NewsDetailComponent news={news} category={category ?? ''}/>
        </>
    )
}
