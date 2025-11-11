import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

import {Link} from "react-router-dom";
import * as React from "react";
import {User} from "lucide-react";
import {NewsItem} from "@/types/news.types.ts";
import NewsRelatedSkeletonComponent from "@/components/news/news-related-skeleton.tsx";

type NewDetailComponentProps = {
    news: NewsItem[] | null
    category: string
}

const NewsRelatedComponent: React.FC<NewDetailComponentProps> = ({news, category}) => {

    if (!news) {
        return <>
            <NewsRelatedSkeletonComponent/>
        </>
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Noticias relacionadas</CardTitle>
                <CardDescription>Noticias relacionadas del sitio : {news[0].news_site}</CardDescription>
            </CardHeader>
            <CardContent>
                <ItemGroup className="grid md:grid-cols-2 gap-4">
                    {news.map((item) => (
                        <Item key={item.id} variant="outline" asChild role="listitem">
                            <Link to={`/news/detail/${category}/${item.id}`}>
                                <ItemMedia variant="image">
                                    <img
                                        src={item.image_url}
                                        alt='Imagen'
                                        width={40}
                                        height={40}
                                        className="object-cover grayscale"
                                    />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="line-clamp-2">
                                        {item.title}
                                    </ItemTitle>
                                    <ItemDescription className="flex items-center gap-2">
                                        <User size={15}/>
                                        {item.authors.length > 0 ? item.authors[0].name : 'N/A'}
                                    </ItemDescription>
                                </ItemContent>
                            </Link>
                        </Item>
                    ))}
                </ItemGroup>

            </CardContent>
        </Card>

    )
}
export default NewsRelatedComponent;
