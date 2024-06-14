"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <div className="flex justify-between pb-4 border-b mb-4">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p className="text-sm">
          Get all the latest news, <br />
          live updates and content about Technology
          <br />
          from across the Tech News
        </p>
      </div>

      {status === "authenticated" ? (
        <div>
          <button onClick={() => signOut()} className="btn">
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <Link href={"/sign-in"} className="btn">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
