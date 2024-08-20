import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";

export default function Notifications() {
  // Sample notifications
  const notifications = [
    {
      id: 1,
      message: "You have a new message from John Doe.",
      time: "2 minutes ago",
    },
    {
      id: 2,
      message: "Your profile was viewed by Jane Smith.",
      time: "15 minutes ago",
    },
    {
      id: 3,
      message: "New comment on your post: 'Great work!'",
      time: "30 minutes ago",
    },
    {
      id: 4,
      message: "Server downtime scheduled for midnight.",
      time: "1 hour ago",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto">
        <div className="grid gap-4 p-4">
          <h4 className="font-medium leading-none">Notifications</h4>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No new notifications.</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-2 border-b border-muted-foreground">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
