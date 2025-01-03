import { auth, signIn, signOut } from "auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-start">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session.user ? (
            <>
              <Link href="/startup/create" className="">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session.user.id}`} className="">
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                ("use server"); // Khai báo để thực thi hành động này trên server
                await signIn("google");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
