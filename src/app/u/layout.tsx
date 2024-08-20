"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Home,
  Loader,
  MessageCircle,
  User,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import useAuthStore from "../Hooks/Auth"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Layout({ children }) {
  const { user, verify, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = usePathname();

  useEffect(() => {
    const verifyAndSetLoading = async () => {
      verify();
      setLoading(false);
    };
    verifyAndSetLoading();
  }, [verify]);

  useEffect(() => {
    const { url } = router;
    console.log(url)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Loader className="animate-spin text-blue-500 h-12 w-12 mx-2" />
      </div>
    )
  }

  if (!loading && !user) {
    return (
      <div className="flex flex-col justify-center items-center py-8">
        <h1 className="text-8xl text-blue-500">400</h1>
        <p className="md:block hidden">You are not authorized to access this page!</p>
        <Image
          src="/error.webp"
          width={400}
          height={500}
          alt="400"
          loading="lazy"
        />
        <p className="md:hidden block">You are not authorized to access this page</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full bg-muted/40 fixed">
      <aside className=" z-10 hidden w-14 flex-col border-r sm:flex z-0">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"

                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full focus:bg-primary text-lg font-semibold focus:text-white text-foreground md:h-8 md:w-8 md:text-base"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/u/profile"

                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full focus:bg-primary text-lg font-semibold focus:text-white text-foreground md:h-8 md:w-8 md:text-base"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/u/chat"

                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full focus:bg-primary text-lg font-semibold focus:text-white text-foreground md:h-8 md:w-8 md:text-base"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        </nav>
      </aside>
      <main className="w-full h-full flex-1" >
        {children}
      </main>
    </div>
  )
}
