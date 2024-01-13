"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

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
    </div>
  );
};

export default NavbarLinks;
