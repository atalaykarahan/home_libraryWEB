"use client";
import { useState, Fragment } from "react";
import logo from "../../../public/images/logo.png";
import krhnlogo from "@/public/images/atalayLogo.png";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import NavbarLinks from "./navbar-links";
import { useCurrentUser } from "@/hooks/use-current-user";
import NavbarLoggedInView from "./navbar-logged-in-view";
import NavbarLoggedOutView from "./navbar-logged-out-view";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const user = useCurrentUser();
  const router = useRouter();

  const navigation = [
    { name: "Anasayfa", href: "/", current: true },
    { name: "Tüm Kitaplar", href: "/allbooks", current: false },
    { name: "Üyeler", href: "/users", current: false },
  ];

  const navigationMobile = [
    { name: "Anasayfa", href: "/", current: true },
    { name: "Tüm Kitaplar", href: "/allbooks", current: false },
    { name: "Üyeler", href: "/users", current: false },
    { name: "Giriş Yap", href: "/login", current: false },
    { name: "Üye Ol", href: "/register", current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  // if user login in mobil view he can see private books link
  if (user)
    navigation.push({ name: "Kitaplarım", href: "/mybooks", current: false });

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
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigationMobile.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
