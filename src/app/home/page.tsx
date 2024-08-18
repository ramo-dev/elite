"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Image as ImageIcon,
  Loader,
  Smile,
  Video,

} from "lucide-react";
import Sidebar from "./components/sidebar";
import Posts from "./posts";
import useAuthStore from "../Hooks/Auth";

export default function Home() {

  const { user, verify, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndSetLoading = async () => {
      verify();
      setLoading(false);
    };
    verifyAndSetLoading();
  }, [verify]);



  return (
    <div className="flex md:flex-row flex-col  min-h-dvh relative flex-wrap ">
      <main className="flex gap-6 md:p-6 p-2 relative justify-between flex-1 flex-wrap">
        <div className="space-y-6 md:w-2/3 w-full">
          <div className="bg-background rounded-lg border p-1 w-full">
            <form className=" gap-2 w-full">
              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="What's on your mind?"
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="w-5 h-5" />
                      <span className="sr-only">Upload photo</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-5 h-5" />
                      <span className="sr-only">Upload video</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="w-5 h-5" />
                      <span className="sr-only">Add feeling/activity</span>
                    </Button>
                  </div>
                  {loading ? <Loader className="animate-spin text-blue-500 h-9 w-9 mx-2" /> :
                    <>
                      {user ?
                        <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-32">
                          Post
                        </Button> :
                        <Link href="/login">
                          <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-32">
                            Login to post
                          </Button>
                        </Link>
                      }
                    </>
                  }
                </div>
              </div>
            </form>
          </div>
          <Posts />
        </div>
        <Sidebar />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 EliteTechies. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" prefetch={false} />
        </nav>
      </footer>
    </div>
  );
}
