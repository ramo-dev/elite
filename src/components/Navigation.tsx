"use client";
import React, { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchIcon, MessagesSquare, MailsIcon, MessageSquareShare, User, Settings, LogOut, BellIcon } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useAuthStore from "@/app/Hooks/Auth";

const NavigationBar = () => {
  const { user, verify, logout } = useAuthStore();

  useEffect(() => {
    verify();
  }, []);

  return (
    <header className="bg-primary-foreground px-2 md:px-8 h-16 flex items-center justify-between sticky top-0 z-10 text-black border-b">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MessageSquareShare className="w-8 h-8" />
        <span className="sr-only">EliteTech</span>
      </Link>

      <div className="flex items-center gap-2 ms-2 flex-1 md:max-w-[500px] justify-end w-2/3">
        {/* Search Form */}
        <form className="rounded-md flex items-center px-3 border justify-between max-w-full w-full md:max-w-md">
          <input
            placeholder="Look up something?"
            type="text"
            className="flex-1 bg-primary-foreground w-full h-full border-none focus:outline-none"
          />
          <Button variant="ghost" className="p-2">
            <SearchIcon className="w-5 h-5" />
          </Button>
          <span className="sr-only">Search</span>
        </form>

        {/* Icons on Desktop */}
        <div className="hidden sm:flex gap-2">
          {user && <>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessagesSquare className="w-5 h-5" />
              <span className="sr-only">Messenger</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MailsIcon className="w-5 h-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </>}

          {/* Conditionally render based on authentication status */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.username} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" className="">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Sheet for Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full sm:hidden">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt={user ? user.username : "Guest"} />
                <AvatarFallback>{user ? user.username[0].toUpperCase() : "G"}</AvatarFallback>
              </Avatar>
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-xs">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu</SheetTitle>
            </SheetHeader>
            <div className="space-y-5 py-4">
              <Button variant="ghost" className="flex justify-start gap-2 w-full">
                <MessagesSquare className="w-6 h-6" />
                <span>Messages</span>
              </Button>
              <Button variant="ghost" className="flex justify-start gap-2 w-full">
                <BellIcon className="w-6 h-6" />
                <span>Notifications</span>
              </Button>
              <Button variant="ghost" className="flex justify-start gap-2 w-full">
                <User className="w-6 h-6" />
                <span>Profile</span>
              </Button>
              <Button variant="ghost" className="flex justify-start gap-2 w-full">
                <Settings className="w-6 h-6" />
                <span>Settings</span>
              </Button>
              {user ? (
                <Button variant="ghost" className="flex justify-start gap-2 w-full" onClick={logout}>
                  <LogOut className="w-6 h-6" />
                  <span>Logout</span>
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="flex justify-start gap-2 w-full">
                    <User className="w-6 h-6" />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default NavigationBar;
