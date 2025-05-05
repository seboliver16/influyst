"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { 
  LayoutDashboard, 
  User, 
  Paintbrush, 
  Settings, 
  Link as LinkIcon, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  ExternalLink,
  PanelLeft,
  PanelLeftClose,
  Sun,
  Moon
} from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import firebase_app from '../app/firebase/config';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from '../app/context/themeContext';

interface SidebarLayoutProps {
  children: React.ReactNode;
  user: {
    name?: string;
    username?: string;
    profilePicture?: string;
    id: string;
  } | null;
}

export default function SidebarLayout({ children, user }: SidebarLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const auth = getAuth(firebase_app);
  const { isDarkMode, toggleTheme } = useTheme();
  
  const navItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === "/dashboard" 
    },
    { 
      name: "Profile", 
      href: "/profile", 
      icon: <User className="h-5 w-5" />,
      active: pathname === "/profile" 
    },
    { 
      name: "Appearance", 
      href: "/profile/appearance", 
      icon: <Paintbrush className="h-5 w-5" />,
      active: pathname === "/profile/appearance" 
    },
    { 
      name: "Settings", 
      href: "/settings", 
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/settings" 
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };
  
  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
  };

  // Close mobile sidebar when changing routes
  useEffect(() => {
    closeMobileSidebar();
  }, [pathname]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
        {/* Desktop sidebar */}
        <aside className={`
          hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 
          ${isDesktopSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
          transition-all duration-300 ease-in-out 
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm
        `}>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto pb-4 px-4">
            <div className={`flex h-16 shrink-0 items-center ${isDesktopSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Influyst Logo" 
                  width={isDesktopSidebarCollapsed ? 32 : 28} 
                  height={isDesktopSidebarCollapsed ? 32 : 28} 
                />
                {!isDesktopSidebarCollapsed && (
                  <span className="ml-2 font-semibold text-lg text-gray-900 dark:text-white">Influyst</span>
                )}
              </Link>
            </div>
            
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-4">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              className={`
                                group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center
                                ${isDesktopSidebarCollapsed ? 'justify-center' : ''}
                                ${item.active
                                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                                  : 'text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'}
                              `}
                            >
                              {item.icon}
                              {!isDesktopSidebarCollapsed && (
                                <span className="truncate">{item.name}</span>
                              )}
                            </Link>
                          </TooltipTrigger>
                          {isDesktopSidebarCollapsed && (
                            <TooltipContent side="right" align="center">
                              {item.name}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </li>
                
                {/* User section at the bottom */} 
                <li className="mt-auto -mx-2">
                  {user && (
                    <div className={`
                      space-y-1 border-t border-gray-200 dark:border-gray-700 
                      ${isDesktopSidebarCollapsed ? 'pt-2' : 'p-2 pt-4'}
                    `}>
                       {/* View Profile Button */} 
                       <Tooltip>
                          <TooltipTrigger asChild>
                             <Link
                               href={`/${user.username}`}
                               className={`
                                 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center w-full
                                 ${isDesktopSidebarCollapsed ? 'justify-center' : ''}
                                 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700/50
                               `}
                               target="_blank"
                             >
                               <ExternalLink className="h-5 w-5" />
                               {!isDesktopSidebarCollapsed && (
                                 <span className="truncate">View Public Profile</span>
                               )}
                             </Link>
                           </TooltipTrigger>
                           {isDesktopSidebarCollapsed && (
                             <TooltipContent side="right" align="center">
                               View Public Profile
                             </TooltipContent>
                           )}
                        </Tooltip>
                      
                       {/* Action Buttons Container: Column layout for both expanded and collapsed states */} 
                       <div className={`flex w-full flex-col space-y-1 ${isDesktopSidebarCollapsed ? 'items-center' : 'mt-2'}`}> 
                         
                         {/* Logout Button */} 
                         <Tooltip>
                           <TooltipTrigger asChild>
                             <Button
                               variant="ghost"
                               size={isDesktopSidebarCollapsed ? 'icon' : 'sm'}
                               onClick={handleLogout}
                               className={`
                                 group flex items-center gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold w-full
                                 ${isDesktopSidebarCollapsed ? 'justify-center' : 'justify-start'} 
                                 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                               `}
                             >
                               <LogOut className="h-5 w-5" />
                               {!isDesktopSidebarCollapsed && (
                                 <span className="truncate">Log Out</span>
                               )}
                             </Button>
                           </TooltipTrigger>
                           {isDesktopSidebarCollapsed && (
                             <TooltipContent side="right" align="center">
                               Log Out
                             </TooltipContent>
                           )}
                         </Tooltip>

                         {/* Theme Toggle Button */} 
                         <Tooltip>
                           <TooltipTrigger asChild>
                             <Button
                               variant="ghost"
                               size={isDesktopSidebarCollapsed ? 'icon' : 'sm'}
                               onClick={toggleTheme}
                               className={`
                                 group flex items-center gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold w-full
                                 ${isDesktopSidebarCollapsed ? 'justify-center' : 'justify-start'}
                                 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:hover:text-gray-200
                               `}
                             >
                               {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                               {!isDesktopSidebarCollapsed && (
                                 <span className="truncate">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                               )}
                             </Button>
                           </TooltipTrigger>
                           <TooltipContent side="right" align="center">
                             {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                           </TooltipContent>
                         </Tooltip>

                         {/* Collapse Button */} 
                         <Tooltip>
                           <TooltipTrigger asChild>
                             <Button
                               variant="ghost"
                               size={isDesktopSidebarCollapsed ? 'icon' : 'sm'}
                               onClick={toggleDesktopSidebar}
                               className={`
                                 group flex items-center gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold w-full
                                 ${isDesktopSidebarCollapsed ? 'justify-center' : 'justify-start'}
                                 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:hover:text-gray-200
                               `}
                             >
                               {isDesktopSidebarCollapsed ? 
                                 <PanelLeftClose className="h-5 w-5" /> : 
                                 <PanelLeft className="h-5 w-5" />
                               }
                               {!isDesktopSidebarCollapsed && (
                                 <span className="truncate">Collapse</span>
                               )}
                             </Button>
                           </TooltipTrigger>
                           {isDesktopSidebarCollapsed && (
                             <TooltipContent side="right" align="center">
                               Expand Sidebar
                             </TooltipContent>
                           )}
                           {!isDesktopSidebarCollapsed && (
                             <TooltipContent side="right" align="center">
                               Collapse Sidebar
                             </TooltipContent>
                           )}
                         </Tooltip>
                         
                       </div> { /* End Action Buttons Container */ }
                      
                       {/* User Avatar / Info */} 
                       <div className={`
                         flex items-center gap-x-3 rounded-md p-2 mt-2 
                         ${isDesktopSidebarCollapsed ? 'justify-center' : ''}
                       `}>
                         <Avatar className="h-8 w-8">
                           <AvatarImage src={user.profilePicture || ''} alt={user.name || 'User'} />
                           <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 text-xs">
                             {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                           </AvatarFallback>
                         </Avatar>
                         {!isDesktopSidebarCollapsed && (
                           <div className="min-w-0">
                             <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white truncate">{user.name || user.username}</p>
                             <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 truncate">@{user.username}</p>
                           </div>
                         )}
                       </div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Mobile header */}
        {/* <header className="sticky top-0 z-40 lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileSidebar}
                className="mr-2"
                aria-label="Toggle menu"
              >
                {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <Link href="/" className="flex items-center">
                <Image src="/logo.svg" alt="Influyst Logo" width={28} height={28} />
                <span className="ml-2 font-semibold text-lg text-gray-900 dark:text-white">Influyst</span>
              </Link>
            </div>
            
            {user && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profilePicture || ''} alt={user.name || 'User'} />
                <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </header> */}

        {/* Mobile sidebar (overlay) */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={closeMobileSidebar}
              aria-hidden="true"
            />
            
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl ${isDarkMode ? 'dark' : ''}`}>
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profilePicture || ''} alt={user.name || 'User'} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name || user.username}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
                          U
                        </AvatarFallback>
                      </Avatar>
                      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                    </div>
                  )}
                </div>
                
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`
                        flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                        ${item.active 
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'}
                      `}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                      <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                    </Link>
                  ))}

                  {user && (
                    <>
                      <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
                      
                      <Link href={`/${user.username}`} className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                        <LinkIcon className="h-5 w-5" />
                        <span className="ml-3">View Public Profile</span>
                        <ExternalLink className="ml-auto h-4 w-4 opacity-50" />
                      </Link>
                      
                      {/* Theme Toggle Button (Mobile) */} 
                      <button
                        onClick={() => { toggleTheme(); closeMobileSidebar(); }}
                        className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        <span className="ml-3">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      </button>

                      {/* Logout Button (Mobile) */} 
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="ml-3">Log Out</span>
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main content area - Ensure theme class is applied if needed */}
        <main className={`
          py-10 flex-1 bg-gray-50 dark:bg-gray-900
          ${isDesktopSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
          transition-all duration-300 ease-in-out
        `}>
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <Toaster position="bottom-right" />
      </div>
    </TooltipProvider>
  );
} 