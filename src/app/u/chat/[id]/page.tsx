"use client"
// src/app/chat/[id]/page.tsx
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { users } from '../mockData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { useEffect } from 'react';

export default function ChatPage() {
  const params = useParams();
  const { id } = params;

  const user = users.find((user) => user?.id === id);

  useEffect(() => {
    console.log(user)
  }, [])

  if (!user) {
    return <div>User not found for {id}</div>;
  }


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
    <div className="flex-1 h-full flex flex-col">
      <div className="p-3 flex border-b items-center justify-between">
        <div className="flex items-center">
          <Avatar className="border w-10 h-10">
            <AvatarImage src={user.avatar} alt="Image" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-2 grid gap-0.5">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs text-muted-foreground">Active 2h ago</p>
          </div>
        </div>
      </div>
      <div className="gap-4 p-3 min-h-[65vh] overflow-y-scroll flex-1 space-y-3">
        {user.messages.map((message) => (
          <div
            key={message.id}
            className={`flex w-max max-w-[65%] flex-col gap-2 rounded-lg px-4 py-4 text-sm ${message.sender === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
              }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="bg-muted p-3 border-t">
        <div className="flex gap-2">
          <Input placeholder="Type your message" className="flex-1" />
          <Button variant="default" className="h-8 px-4" aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
