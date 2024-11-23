"use client"; // Ensure it's a client component

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import "@/app/globals.css";

import 'nprogress/nprogress.css';

const TopLoadingBar = () => {
  const pathname = usePathname(); // Use usePathname for App Router

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // You can adjust this delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]); 

  return null;
};

export default TopLoadingBar;
