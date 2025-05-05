"use client";

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import { User } from '../user';
import SidebarLayout from '../../components/SidebarLayout';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setLoading(true);
        const userDocRef = doc(db, 'users', authUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUser(userDocSnapshot.data() as User);
        } else {
          console.error('User document does not exist');
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        router.push('/login');
      }
    });

    return () => loadUserInfo();
  }, [auth, db, router]);

  // Show a loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return <SidebarLayout user={user}>{children}</SidebarLayout>;
} 