"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const user = useCurrentUser();
  console.log(user);

  return (
    <div className="flex space-x-4">
      <Link
        className={classNames(
          pathname === "/"
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
        href="/"
      >
        Anasayfa
      </Link>
      <Link
        className={classNames(
          pathname === "allbooks"
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
        href="/allbooks"
      >
        Tüm Kitaplar
      </Link>
      <Link
        className={classNames(
          pathname === "/users"
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
        href="/users"
      >
        Üyeler
      </Link>
      {user ? (
        <Link
          className={classNames(
            pathname === "/mybooks"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
          href="/mybooks"
        >
          Kitaplarım
        </Link>
      ) : undefined}
    </div>
  );
};

export default NavbarLinks;
