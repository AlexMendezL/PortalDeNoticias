import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {CalendarClock, ChevronRight, Globe, User} from "lucide-react";
import * as React from "react";
import {parseISO, format} from "date-fns";
import {es} from "date-fns/locale/es";

type NewDetailComponentProps = {
    // news: NewsItem
    // category: string
}

const getFormatedDate = (dateString: string): string => {

    const date = parseISO(dateString)
    return format(date, 'd MMM yyyy h:mm a', {locale: es})
}
const NewsDetailComponent: React.FC<NewDetailComponentProps> = () => {
    const music = [
        {
            title: "Midnight City Lights",
            artist: "Neon Dreams",
            album: "Electric Nights",
            duration: "3:45",
        },
        {
            title: "Coffee Shop Conversations",
            artist: "The Morning Brew",
            album: "Urban Stories",
            duration: "4:05",
        },
        {
            title: "Digital Rain",
            artist: "Cyber Symphony",
            album: "Binary Beats",
            duration: "3:30",
        },
    ]
    return (
        <>
            <div className="grid lg:grid-cols-2 gap-6 content-center">
                <div>
                    {/*src={news.image_url}*/}
                    <img
                        src="https://cdn.arstechnica.net/wp-content/uploads/2025/01/New-Glenn-1.jpg"
                        alt='image'
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <Card>
                    <CardHeader className="flex flex-col gap-5">

                        {/*<h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">*/}
                        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
                            {/*{news.title}*/}
                            Blue Origin will ‘move heaven and Earth’ to help NASA reach the Moon faster, CEO says
                        </h1>

                        <p className="leading-7">
                            {/*{news.summary}*/}
                            We have some ideas that we think could accelerate the path to the Moon
                        </p>

                        <div className="flex gap-2 text-sm">
                            <div className="flex gap-0.5 text-sm items-center">
                                <User size={18}/>
                                {/*<p>{news.authors.length > 0 ? news.authors[0].name : 'N/A'}</p>*/}
                                <p>Autor</p>
                            </div>
                            <div className="flex gap-0.5 items-center">
                                <CalendarClock size={18}/>
                                {/*<p>{formattedDate}</p>*/}
                                <p>{getFormatedDate("2025-11-08T21:27:42Z")}</p>
                            </div>
                            <div className="flex gap-0.5 items-center">
                                <Globe size={18}/>
                                {/*<p>{new.news_site}</p>*/}
                                <p>Arstechnica</p>
                            </div>
                        </div>


                        <Button asChild className="w-max">
                            {/*to={news.url}*/}
                            <Link
                                to="https://arstechnica.com/space/2025/11/blue-origin-will-move-heaven-and-earth-to-help-nasa-reach-the-moon-faster-ceo-says"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ir a la noticia oficial
                                <ChevronRight/>
                            </Link>

                        </Button>
                    </CardHeader>
                </Card>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Noticias relacionadas</CardTitle>
                    <CardDescription>Noticias relacionadas del sitio : Sitio</CardDescription>
                </CardHeader>
                <CardContent >
                    <ItemGroup className="grid md:grid-cols-2 gap-4">
                        {music.map((song) => (
                            <Item key={song.title} variant="outline" asChild role="listitem">
                                <Link to={`/news/detail/blogs/1`}>
                                    <ItemMedia variant="image">
                                        <img
                                            src={`https://avatar.vercel.sh/${song.title}`}
                                            alt={song.title}
                                            width={40}
                                            height={40}
                                            className="object-cover grayscale"
                                        />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle className="line-clamp-2">
                                            {song.title} asfd asdf sdfasf asdf asf saf
                                        </ItemTitle>
                                        <ItemDescription className="flex items-center gap-2">
                                            <User size={15}/>
                                            {song.artist}
                                        </ItemDescription>
                                    </ItemContent>
                                </Link>
                            </Item>
                        ))}
                    </ItemGroup>

                </CardContent>
            </Card>
        </>

    )
}
export default NewsDetailComponent;
