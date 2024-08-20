"use client"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import useAuthStore from '../../Hooks/Auth';
import Settings from './settings/Settings';
import Image from 'next/image';
import { calculateAge } from './settings/ageCalc';

const ProfileLayout = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex md:flex-row flex-col overflow-y-scroll">
      {/* Profile Header */}
      <header className="hidden md:flex border-b py-4 px-6 flex items-center flex-col md:w-4/12 w-full space-y-10">
        <Image
          className='w-[35vh] h-[35vh] rounded-full border'
          src={user?.avatar || user?.username.charAt[0]}
          height={400}
          width={400}
          alt={user?.username}
          loading='lazy'
        />
        <div className="my-4 space-y-4">
          <h1 className="text-2xl font-bold">{user?.username || 'Username'}</h1>
          <p className="text-lg text-gray-500">{user?.email || 'Email not provided'}</p>
          <p className='text-gray-500'>Your account is {calculateAge(user?.created).days} days old</p>
          <p className={`${user?.verified ? "bg-green-400" : "bg-red-400"} px-4 p-1 my-1 border rounded-md`}>
            {user?.verified ? 'Verified' : 'Not Verified'}
          </p>
        </div>
      </header>
      <header className='flex justify-around items-center relative md:hidden'>
        <Image
          className='w-[10vh] h-[10vh] rounded-full border'
          src={user?.avatar || user?.username.charAt[0]}
          height={400}
          width={400}
          alt={user?.username}
          loading='lazy'
        />
        <div className="my-4">
          <h1 className="text-lg font-bold">{user?.username || 'Username'}</h1>
          <p className="text-gray-500">{user?.email || 'Email not provided'}</p>
          <p className='text-gray-500'>Your account is {calculateAge(user?.created).days} days old</p>
          <p className={`${user?.verified ? "bg-green-400" : "bg-red-400"} px-4 p-1 my-1 border rounded-md`}>
            {user?.verified ? 'Verified' : 'Not Verified'}
          </p>
        </div>
      </header>
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Settings />
      </main>
    </div>
  );
};

export default ProfileLayout;

