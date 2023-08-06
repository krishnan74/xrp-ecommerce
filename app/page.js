"use client";

import Image from "next/image";
import { Button } from "components/ui/button";
import { buttonVariants } from "components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-evenly items-center">
      <h1>XRP - ECOMMERCE</h1>
      <Link href={"dashboard"}>
        <button className={buttonVariants({ variant: "outline" })}>
          SignIn
        </button>
      </Link>
    </div>
  );
}
