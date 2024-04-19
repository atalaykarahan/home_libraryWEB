import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLoggedOutView = () => {
  const pathname = usePathname();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="max-sm:hidden  absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="flex space-x-4">
        <Link
          className={classNames(
            pathname === "/login"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap"
          )}
          href="/login"
        >
          Giriş Yap & Üye Ol
        </Link>
      </div>
    </div>
  );
};

export default NavbarLoggedOutView;
