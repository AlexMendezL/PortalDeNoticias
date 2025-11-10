import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {ChevronRight, User} from "lucide-react";
import {NewsItem} from "@/types/news.types.ts";
import * as React from "react";

type NewCardComponentProps = {
    news: NewsItem
    category: string
}

const NewsCardComponent: React.FC<NewCardComponentProps> = ({news, category}) => {

    return (
        <>
            <Card>
                <CardHeader>
                    <img
                        src={news.image_url}
                        alt='image'
                        className="w-full h-60 object-cover rounded-md"
                    />
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="flex gap-2 text-sm">
                        <div className="flex gap-0.5 text-sm items-center">
                            <User size={18}/>
                            <p>{news.authors.length > 0 ? news.authors[0].name : 'N/A'}</p>
                        </div>
                    </div>
                    <CardTitle className="line-clamp-2 leading-normal">
                        {news.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed">
                        {news.summary}
                    </CardDescription>

                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button asChild>
                        <Link to={`/news/detail/${category}/${news.id}`}>
                            Leer más
                            <ChevronRight/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
export default NewsCardComponent;
