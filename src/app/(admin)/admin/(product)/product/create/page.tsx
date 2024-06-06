import {Shell} from "@/components/shell";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";








export default function ProductCreatePage () {
    return (
        <div>
           <div className="prd_content ">
               <Card className="rounded-lg shadow-sm ">
                   <CardHeader>
                       <CardTitle>Card Title</CardTitle>
                       <CardDescription>Card Description</CardDescription>
                   </CardHeader>
                   <CardContent>
                       <p>Card Content</p>
                   </CardContent>
                   <CardFooter>
                       <p>Card Footer</p>
                   </CardFooter>
               </Card>
           </div>
        </div>
    )
}