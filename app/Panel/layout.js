'use client';

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Image from "next/image";
import loading from './ui/loading.gif';
import Navbar from "./components/Navbar";
import TopLoadingBar from "@/components/TopLoadingBar";
function LayoutWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (session) {
  //     if (session.user.role !== "admin") {
  //       router.push("/");
  //     }
  //   } else if (!session && status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [session]);

  if (status === "loading") {
    return (
      <div className='w-full h-screen bg-transparent flex items-center justify-center'>
        <Image src={loading} alt="Loading..." />
      </div>
    );
  }

  if (status === "authenticated" && session?.user?.role === "admin") {
    return <div>{children}</div>;
  }else {
    return null; // Return nothing while redirecting



  }

  // return <div>{children}</div>;

}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>

      <LayoutWrapper>
        <TopLoadingBar />

        <Navbar />
        {children}
        </LayoutWrapper>
    </SessionProvider>
  );
}
