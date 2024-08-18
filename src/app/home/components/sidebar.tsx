import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { PlusIcon, TrendingUpIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="space-y-6 sticky top-20 h-screen w-full md:w-[300px] flex-1">
      <Card className="bg-background rounded-lg border">
        <CardHeader className="flex flex-row items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Suggested Friends</h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <Link href="#" className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg" prefetch={false}>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-xs text-muted-foreground">5 mutual friends</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <PlusIcon className="w-4 h-4" />
              <span className="sr-only">Add Friend</span>
            </Button>
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg" prefetch={false}>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">2 mutual friends</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <PlusIcon className="w-4 h-4" />
              <span className="sr-only">Add Friend</span>
            </Button>
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg" prefetch={false}>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">Maria Gonzalez</p>
              <p className="text-xs text-muted-foreground">7 mutual friends</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <PlusIcon className="w-4 h-4" />
              <span className="sr-only">Add Friend</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card className="bg-background rounded-lg border">
        <CardHeader className="flex flex-row items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Trending</h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <Link href="#" className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg" prefetch={false}>
            <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">New Tech Startup Raises $10M in Funding</p>
              <p className="text-xs text-muted-foreground">2h ago &middot; 1.2K shares</p>
            </div>
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg" prefetch={false}>
            <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">Viral Video of Cute Puppy Goes Viral</p>
              <p className="text-xs text-muted-foreground">4h ago &middot; 3.4K shares</p>
            </div>
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg" prefetch={false}>
            <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">Breaking: Major Sports Event Canceled</p>
              <p className="text-xs text-muted-foreground">6h ago &middot; 7.8K shares</p>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}


export default Sidebar
