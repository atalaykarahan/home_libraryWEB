"use client";

import { logoutTogether } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    /* Ben bu projede ogrenmek icin yaptım ancak istiyorsan fetch kodu ile 
        Kombinleyip tek bir func ile hem backend hem frontend tarafında logout yaparsın
        yapı basit zaten*/

    logoutTogether();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
  )
};
