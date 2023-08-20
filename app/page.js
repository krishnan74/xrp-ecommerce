"use client";

import Image from "next/image";
import { Button } from "components/ui/button";
import { buttonVariants } from "components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/logo.png"
        alt="XRP-ECommerce Logo"
        width={300}
        height={300}
      />
      <h1 className="text-4xl mt-4">Welcome to XRP - ECOMMERCE</h1>
      <p className="text-lg mt-2 text-center">
        Revolutionize your buying and selling experience with our decentralized platform powered by the XRP ledger.
      </p>
      <Link href={"dashboard"}>
        <Button
          variant={buttonVariants({ variant: "outline" })}
          className="mt-4"
        >
          Sign In
        </Button>
      </Link>
      <p className="mt-2 text-gray-500">
        Don't have an account yet?{" "}
        <Link href={"signup"}>
          <span className="underline">Sign up here</span> 
        </Link>
      </p>
    </div>
  );
}
