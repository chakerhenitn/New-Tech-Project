"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    if (!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
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
        <>
          <div
            ref={popupRef}
            className={`absolute z-30 
          right-0 top-20 bg-white p-6 
          shadow-lg rounded-md  flex-col gap-2
          text-right min-w-]160px] ${isPopupVisible ? "flex" : "hidden"}`}
          >
            <div className="font-bold">{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Link
              onClick={() => setIsPopupVisible(false)}
              className="hover:underline"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <Link
              onClick={() => setIsPopupVisible(false)}
              className="hover:underline"
              href={"/create-post"}
            >
              Create Post
            </Link>
            <button onClick={() => signOut()} className="btn">
              Sign out
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              className="hidden md:flex gap-2 items-center mr-6"
              href={"/create-post"}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </span>
              <span>Create New</span>
            </Link>
            <Image
              onClick={() => setIsPopupVisible((prev) => !prev)}
              className="rounded-full cursor-pointer"
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile Image"
            />
          </div>
        </>
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
