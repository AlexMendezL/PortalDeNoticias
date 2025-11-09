import { PageHeader, PageHeaderHeading } from "@/components/page-header.tsx";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";

export default function NewsPage() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>News Page</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description.</CardDescription>
                </CardHeader>
            </Card>
        </>
    )
}
