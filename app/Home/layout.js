'use client';

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Image from "next/image";
import loading from './ui/loading.gif';
import Navbar from "@/components/Navbar";

function LayoutWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
   if (session) {
      if (session.user.role !== "user") {
        router.push("/");
      }
    } else if (!session && status === "authenticated") {
      router.push("/");
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Image src={loading} alt="Loading..." />
      </div>
    );
  }

  if (status === "authenticated" && session?.user?.role === "user") {
    return <div>{children}</div>;
  }

  return null; // Return nothing while redirecting
}

export default function HomeLayout({ children }) {
  return (
    <SessionProvider>

      <LayoutWrapper>
        <Navbar />
        {children}</LayoutWrapper>
    </SessionProvider>
  );
}
