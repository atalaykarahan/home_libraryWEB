// "use client";
import { Menu, Transition } from "@headlessui/react";
import { FaRegBell } from "react-icons/fa";
import krhnlogo from "@/public/images/atalayLogo.png";
import Image from "next/image";
import { Fragment, useState } from "react";
import { logoutClient } from "@/app/_api/services/authService";
import { logout } from "@/actions/logout";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import CreateCategory from "@/components/dialog/create-category";
import CreateBook from "@/components/dialog/create-book";
import CreatePublisher from "@/components/dialog/publishers/create-publisher";
import Publishers from "@/components/dialog/publishers/publishers";

const NavbarLoggedInView = () => {
  const [createCategoryModal, setCreateCategoryModal] =
    useState<boolean>(false); // Yeni state
  const [createBookModal, setCreateBookModal] = useState<boolean>(false); // Yeni state
  const [publishersModal, setPublishersModal] =
    useState<boolean>(false); // Yeni state

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const user = useCurrentUser();
  // console.log(user & user.role === "1");

  // const logOutClick = () => {
  //   logoutClient().then((res: any) => {
  //     if (res.status === 200) {
  //       logout();
  //     }
  //   });
  // };

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <CreateCategory
        openModal={createCategoryModal}
        closeModal={() => setCreateCategoryModal(false)}
      />

      <CreateBook
        openModal={createBookModal}
        closeModal={() => setCreateBookModal(false)}
      />

      <Publishers
        openModal={publishersModal}
        closeModal={() => setPublishersModal(false)}
      />

      <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <FaRegBell className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}

      <Menu as="div" className="relative ml-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-orange-500">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuItem>Profil</DropdownMenuItem>
            {/* {user ? <NavbarLoggedInView /> : <NavbarLoggedOutView />} */}
            {user && user.role >= 2 ? (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    setPublishersModal(true);
                  }}
                >
                  Yayınevleri
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCreateBookModal(true);
                  }}
                >
                  Kitap Ekle
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCreateCategoryModal(true);
                  }}
                >
                  Kategori Ekle
                </DropdownMenuItem>
              </>
            ) : undefined}
            <DropdownMenuItem>Ayarlar</DropdownMenuItem>
            <LogoutButton>
              <DropdownMenuItem>
                <ExitIcon className="h-4 w-4 mr-2" />
                Çıkış yap
              </DropdownMenuItem>
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </Menu>
      {/* <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <Image
              width="100"
              height="100"
              className="h-8 w-8 rounded-full"
              src={krhnlogo}
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Profil
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Ayarlar
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={logOutClick}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Çıkış yap
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu> */}
    </div>
  );
};

export default NavbarLoggedInView;
