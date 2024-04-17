"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLinks = () => {
  const pathname = usePathname();
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const user = useCurrentUser();

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link
        href="/profile"
        className={classNames(
          pathname === "/profile" ? "font-semibold text-primary" : ""
        )}
      >
        Genel
      </Link>
      <Link
        href="/profile/privacy"
        className={classNames(
          pathname === "/profile/privacy" ? "font-semibold text-primary" : ""
        )}
      >
        Gizlilik
      </Link>
      {user?.role == 2 && (
        <Link
          href="/profile/users"
          className={classNames(
            pathname === "/profile/users" ? "font-semibold text-primary" : ""
          )}
        >
          Kullanıcılar
        </Link>
      )}

      {/* <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link> */}
    </nav>
  );
};

export default SidebarLinks;
