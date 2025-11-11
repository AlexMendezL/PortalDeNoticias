import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";


const NewsRelatedSkeletonComponent = () => {
    return (
        <Card className="mt-6">
            <CardHeader>
                <Skeleton className="w-[170px] h-[15px]"/>
                <Skeleton className="w-[220px] h-[15px]"/>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                {Array.from({length: 6}).map((_, index) =>
                    <Skeleton className="w-full h-[55px]" key={index}/>
                )}
            </CardContent>
        </Card>

    )
}
export default NewsRelatedSkeletonComponent;
