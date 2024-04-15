"use client";
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

const Profile = () => {
  const user = useCurrentUser();

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
    <>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Kullanıcı Adı</CardTitle>
          <CardDescription>
            Kullanıcı adı güncellemesi ilerde getirilecek!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder={user?.name ?? ""} />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Kaydet</Button>
        </CardFooter>
      </Card>
      {/* <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card> */}
    </>
  );
};

export default Profile;
