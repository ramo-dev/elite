import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ImageIcon,
  Smile,
  Video,
  Bookmark,
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  Star,
  AlertTriangle,
  Loader2,
  Loader,

} from "lucide-react";


export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
        res.json()
      ),
    ]).then(([postsData, commentsData]) => {
      setPosts(postsData); // Limit to 5 posts for this example
      setComments(commentsData.slice(0, 1)); // Limit to 10 comments
      setLoading(false)
    });
  }, []);

  if (loading) {
    (
      <>
      </>
    );
  }

  return (
    <>
      {loading ? <span className="flex items-center justify-center my-auto h-dvh w-full">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </span>
        :

        posts.map((post) => (
          <div key={post.id} className="bg-background rounded-lg border">
            <Card className="border-0 shadow-none">
              <CardHeader className="flex flex-row items-center p-4">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-sm font-semibold"
                  prefetch={false}
                >
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage
                      src={`https://via.placeholder.com/150/${Math.floor(
                        Math.random() * 100000
                      )}`}
                      alt="User"
                    />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  {post.title.slice(0, 7)}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 ml-auto rounded-full"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="w-4 h-4 mr-2" />
                      Add to favorites
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  src={`https://via.placeholder.com/800/${Math.floor(
                    Math.random() * 100000
                  )}`}
                  width={400}
                  height={225}
                  alt="Post"
                  loading="lazy"
                  className="object-cover aspect-square w-full max-h-[470px]"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-2 pb-4">
                <div className="flex items-center w-full gap-1">
                  <Button variant="ghost" size="icon">
                    <Heart className="w-6 h-6" />
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="w-6 h-6" />
                    <span className="sr-only">Comment</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share className="w-6 h-6" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <Bookmark className="w-6 h-6" />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                </div>
                <div className="px-2 text-sm w-full grid gap-1.5">
                  {comments
                    .filter((comment) => comment.postId === post.id)
                    .map((comment) => (
                      <div key={comment.id}>
                        <Link
                          href="#"
                          className="font-medium"
                          prefetch={false}
                        >
                          {comment.name}
                        </Link>
                        {comment.body}
                      </div>
                    ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        ))
      }
    </>
  )
}
