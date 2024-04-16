"use client";
import { useEffect, useState } from "react";
import { UserTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getUserBookGridList } from "@/app/_api/services/userService";

const UserTablePage = () => {
  const [users, setUsers] = useState<UserTableModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getUserBookGridList();

      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }
      setUsers(res.data);
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
