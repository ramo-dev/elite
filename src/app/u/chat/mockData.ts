
// data/mockData.ts

export type User = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
  lastMessageTime: string;
};

export type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
};

export const users: User[] = [
  {
    id: '1',
    name: 'Sofia Davis',
    avatar: '/placeholder-user.jpg',
    status: 'Active 2h ago',
    lastMessage: 'Hey hope you’re doing well! We should catch up sometime soon. 🙏',
    lastMessageTime: '2h',
  },
  {
    id: '2',
    name: 'Alex Johnson',
    avatar: '/placeholder-user.jpg',
    status: 'Just finished a great book! 📚',
    lastMessage: 'Just finished a great book! 📚',
    lastMessageTime: '45m',
  },
  {
    id: '3',
    name: 'Maria Gonzalez',
    avatar: '/placeholder-user.jpg',
    status: 'Excited for the weekend!',
    lastMessage: 'Excited for the weekend!',
    lastMessageTime: '1h',
  },
  {
    id: '4',
    name: 'Kevin Brown',
    avatar: '/placeholder-user.jpg',
    status: 'Who’s up for a movie night?',
    lastMessage: 'Who’s up for a movie night?',
    lastMessageTime: '3h',
  },
  {
    id: '5',
    name: 'Lily White',
    avatar: '/placeholder-user.jpg',
    status: 'Morning coffee is the best! ☕',
    lastMessage: 'Morning coffee is the best! ☕',
    lastMessageTime: '30m',
  },
];

export const messages: Message[] = [
  { id: '1', text: 'Hey hope you’re doing well! We should catch up sometime soon. 🙏', senderId: '1', timestamp: '2024-08-19T08:00:00Z' },
  { id: '2', text: 'Sure! I’m free this weekend if you want to grab a coffee.', senderId: '5', timestamp: '2024-08-19T08:05:00Z' },
  { id: '3', text: 'Sounds good! Let’s meet at the Starbucks on 5th Ave.', senderId: '1', timestamp: '2024-08-19T08:10:00Z' },
  { id: '4', text: 'I’ll message you on Saturday.', senderId: '5', timestamp: '2024-08-19T08:15:00Z' },
];
