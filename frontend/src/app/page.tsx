"use client";

import Header from "@/components/Header";
import Link from "next/link";

export default function Home(){
  
  return(
    <div>
      <Header/>
      <Link href="/game" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Iniciar o Jogo!
      </Link>
    </div>
  );
}