"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import krhnlogo from "@/public/images/atalayLogo.png";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import NavbarLinks from "./navbar-links";
import NavbarLoggedInView from "./navbar-logged-in-view";
import NavbarLoggedOutView from "./navbar-logged-out-view";
import NavbarMobile from "./navbar-mobile";

const NavBar = () => {
  const user = useCurrentUser();
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <RxHamburgerMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <RxHamburgerMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  className="flex flex-shrink-0 items-center"
                  onClick={() => router.push("/")}
                >
                  <Image
                    className="h-8 w-auto"
                    src={krhnlogo}
                    width="100"
                    height="100"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <NavbarLinks />
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? <NavbarLoggedInView /> : <NavbarLoggedOutView />}
              </div>
            </div>
          </div>

          {/* mobile view */}
          <NavbarMobile />
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
