import { LogoutButton } from "@/components/auth/logout-button";
import Authors from "@/components/dialog/authors/authors";
import Categories from "@/components/dialog/categories/categories";
import CreateBook from "@/components/dialog/create-book";
import Publishers from "@/components/dialog/publishers/publishers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Menu } from "@headlessui/react";
import { ExitIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FaRegBell, FaUser } from "react-icons/fa";

const NavbarLoggedInView = () => {
  const [createBookModal, setCreateBookModal] = useState<boolean>(false);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [publisherModal, setPublisherModal] = useState<boolean>(false);
  const [authorModal, setAuthorModal] = useState<boolean>(false);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const user = useCurrentUser();

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <CreateBook
        openModal={createBookModal}
        closeModal={() => setCreateBookModal(false)}
      />

      <Categories
        openModal={categoryModal}
        closeModal={() => setCategoryModal(false)}
      />

      <Publishers
        openModal={publisherModal}
        closeModal={() => setPublisherModal(false)}
      />

      <Authors
        openModal={authorModal}
        closeModal={() => setAuthorModal(false)}
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
                    setAuthorModal(true);
                  }}
                >
                  Yazarlar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCategoryModal(true);
                  }}
                >
                  Kategoriler
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setPublisherModal(true);
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
