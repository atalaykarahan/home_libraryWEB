"use client";
import { useEffect, useState } from "react";
import { UserTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllUsers } from "@/app/_api/services/userService";

const UserTablePage = () => {
  const [users, setUsers] = useState<UserTableModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllUsers();

      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }
      const formattedResponse = res.data.map((u: any) => {
        const createdAtDate = new Date(u.createdAt);
        const formattedDate = `${createdAtDate
          .getDate()
          .toString()
          .padStart(2, "0")}/${(createdAtDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${createdAtDate.getFullYear()}`;

        const myFormat = {
          user_id: u.user_id,
          user_name: u.user_name,
          createdAt: formattedDate,
          authority: u.AUTHOR.role,
          user_visibility: u.user_visibility,
          user_library_visibility: u.user_library_visibility,
        };
        return myFormat;
      });
      console.log(res);
      setUsers(formattedResponse);
    } catch (error) {
      console.warn("user try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UserTablePage;
