"use client"
// src/app/chat/layout.tsx
import { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';
import { users } from './mockData';

interface LayoutProps {
  children: ReactNode;
}

export default function ChatLayout({ children }: LayoutProps) {
  function chatMenu() {
    return (
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full">
            <SheetHeader>
              <div className="font-medium text-sm">TechieHub</div>
            </SheetHeader>
            <div className="relative my-4">
              <Input
                placeholder="Search"
                className="h-8 pl-8 pr-2 rounded-full bg-muted/50 focus:bg-background"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="py-4 grid gap-2">
              {users.map((user) => (
                <Link
                  key={user.id}
                  href={`/chat/${user.id}`}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted"
                >
                  <Avatar className="border w-10 h-10">
                    <AvatarImage src={user.avatar} alt="Image" />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.messages[user.messages.length - 1].content} &middot; {new Date(user.messages[user.messages.length - 1].timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex w-full rounded-lg overflow-hidden h-full relative">
      <div className="hidden lg:block bg-muted/20 p-3 border-r w-3/12 h-screen">
        <div className="flex items-center justify-between space-x-4">
          <div className="font-medium text-sm">TechieHub</div>
          <div className="relative">
            <Input
              placeholder="Search"
              className="h-8 pl-8 pr-2 rounded-full bg-muted/50 focus:bg-background"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="py-4 grid gap-2">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/u/chat/${user.id}`}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted"
            >
              <Avatar className="border w-10 h-10">
                <AvatarImage src={user.avatar} alt="Image" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.messages[user.messages.length - 1].content} &middot; {new Date(user.messages[user.messages.length - 1].timestamp).toLocaleTimeString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 h-40 flex flex-col justify-start max-w-full">
        {children}
      </div>
    </div>
  );
}
