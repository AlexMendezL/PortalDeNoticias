import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const NewsCardSkeletonComponent: React.FC<{ key: number }> = ({key}) => {

    return (
        <>
            <Card key={key}>
                <CardHeader>
                    <Skeleton className="w-full h-60 object-cover rounded-t-lg"/>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="flex gap-2 text-sm">
                        <Skeleton className="w-[90px] h-[20px]"/>
                    </div>

                    <Skeleton className="w-full h-[45px]"/>
                    <CardDescription className="flex flex-col gap-3">
                        <Skeleton className="w-full h-[20px]"/>
                        <Skeleton className="w-full h-[20px]"/>
                        <Skeleton className="w-full h-[20px]"/>
                        <Skeleton className="w-[90%] h-[20px]"/>
                    </CardDescription>

                </CardContent>
                <CardFooter className="flex justify-end">
                    <Skeleton className="w-[100px] h-[35px]"/>
                </CardFooter>
            </Card>
        </>
    )
}
export default NewsCardSkeletonComponent;
