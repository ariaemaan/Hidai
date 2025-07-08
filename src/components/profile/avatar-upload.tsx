import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Upload } from "lucide-react"

export function AvatarUpload() {
  return (
    <Card>
      <CardHeader className="items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://placehold.co/100x100.png" alt="@user" data-ai-hint="avatar user"/>
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="text-xl font-bold font-headline">Ahmad Wali</h3>
        <p className="text-muted-foreground">ahmad@example.com</p>
        <Button className="mt-4 w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload new picture
        </Button>
      </CardContent>
    </Card>
  )
}
