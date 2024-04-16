import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";

const NavItems = [
  {
    title: "Genel",
    href: "/profile",
  },
  {
    title: "Gizlilik",
    href: "/profile/privacy",
  },
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = async ({ children }) => {
  const user = await currentUser();

  const getUserRole = (role: number | undefined) => {
    if (role) {
      switch (role.toString()) {
        case "1":
          return "üye";
        case "2":
          return "admin";
        case "3":
          return "kullanıcı";
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">
            {user?.name}{" "}
            <Badge variant="outline">{getUserRole(user?.role)}</Badge>
          </h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="/profile" className="font-semibold text-primary">
              Genel
            </Link>
            <Link href="/profile/privacy">Gizlilik</Link>
            {user?.role == 2 && <Link href="/profile/users">Kullanıcılar</Link>}

            {/* <Link href="#">Integrations</Link>
              <Link href="#">Support</Link>
              <Link href="#">Organizations</Link>
              <Link href="#">Advanced</Link> */}
          </nav>
          <div className="grid gap-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
