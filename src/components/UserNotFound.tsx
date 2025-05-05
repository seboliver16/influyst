import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserNotFoundProps {
  username: string;
}

const UserNotFound: React.FC<UserNotFoundProps> = ({ username }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Creator Not Found</h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
        We couldn&apos;t find a creator with the username
      </p>
      
      <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-purple-600 dark:text-purple-400 font-medium mb-6">
        {username}
      </div>
      
      <p className="text-gray-500 dark:text-gray-500 max-w-md mb-8">
        The username might be misspelled, the account may have been removed, or this creator hasn&apos;t signed up for Influyst yet.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/">
            Go Home
          </Link>
        </Button>

        <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
        text-white rounded-full px-6">
          <Link href="/signup">
            Create Your Profile
          </Link>
        </Button>
      </div>
      
      <div className="mt-16 flex items-center justify-center">
        <div className="h-px w-16 bg-gray-200 dark:bg-gray-700"></div>
        <Image src="/logo.svg" height={24} width={24} alt="Influyst" className="mx-4" />
        <div className="h-px w-16 bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default UserNotFound; 