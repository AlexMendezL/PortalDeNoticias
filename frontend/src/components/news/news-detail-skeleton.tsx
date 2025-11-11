import {Card, CardHeader} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";


const NewsDetailSkeletonComponent = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-6 content-center">
            <Skeleton className="w-full h-[341px]"/>
            <Card>
                <CardHeader className="flex flex-col gap-5">
                    <Skeleton className="w-full h-[120px]"/>
                    <Skeleton className="w-full h-[50px]"/>

                    <div className="flex gap-2 text-sm">
                        <Skeleton className="w-[100px] h-[25px]"/>
                        <Skeleton className="w-[100px] h-[25px]"/>
                    </div>

                    <Skeleton className="w-[175px] h-[36px]"/>
                </CardHeader>
            </Card>
        </div>

    )
}
export default NewsDetailSkeletonComponent;
