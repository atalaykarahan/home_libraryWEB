import { useCurrentUser } from "@/hooks/use-current-user";
import { Disclosure } from "@headlessui/react";
import { usePathname } from "next/navigation";

const NavbarMobile = () => {
  const pathname = usePathname();
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const user = useCurrentUser();

  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Disclosure.Button
          as="a"
          href="/"
          className={classNames(
            pathname == "/"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
        >
          Anasayfa
        </Disclosure.Button>
        <Disclosure.Button
          as="a"
          href="/allbooks"
          className={classNames(
            pathname == "/allbooks"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
        >
          Tüm Kitaplar
        </Disclosure.Button>
        {user && (
          <Disclosure.Button
            as="a"
            href="/mybooks"
            className={classNames(
              pathname == "/mybooks"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
          >
            Kitaplarım
          </Disclosure.Button>
        )}
        <Disclosure.Button
          as="a"
          href="/users"
          className={classNames(
            pathname == "/users"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
        >
          Üyeler
        </Disclosure.Button>
        {!user && (
          <>
            <Disclosure.Button
              as="a"
              href="/login"
              className={classNames(
                pathname == "/login"
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              Giriş Yap
            </Disclosure.Button>
            <Disclosure.Button
              as="a"
              href="/register"
              className={classNames(
                pathname == "/register"
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              Üye Ol
            </Disclosure.Button>
          </>
        )}
      </div>
    </Disclosure.Panel>
  );
};

export default NavbarMobile;
