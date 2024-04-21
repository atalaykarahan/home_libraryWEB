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
import Link from "next/link";
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
      {/* Bu kısım mecbur boyle olmak zorunda yoksa bultiple selector duzgın calismiyor */}
      <CreateBook
        openModal={createBookModal}
        closeModal={() => setCreateBookModal(false)}
      />

      {categoryModal && (
        <Categories
          openModal={categoryModal}
          closeModal={() => setCategoryModal(false)}
        />
      )}

      {publisherModal && (
        <Publishers
          openModal={publisherModal}
          closeModal={() => setPublisherModal(false)}
        />
      )}

      {authorModal && (
        <Authors
          openModal={authorModal}
          closeModal={() => setAuthorModal(false)}
        />
      )}

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
            <Link href="/profile">
              <DropdownMenuItem>Profil</DropdownMenuItem>
            </Link>
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
                disabled={user?.role == 1}
                onClick={() => {
                  setCreateBookModal(true);
                }}
              >
                Kitap Ekle
              </DropdownMenuItem>
            </>

            <LogoutButton>
              <DropdownMenuItem>
                <ExitIcon className="h-4 w-4 mr-2" />
                Çıkış yap
              </DropdownMenuItem>
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </Menu>
    </div>
  );
};

export default NavbarLoggedInView;
