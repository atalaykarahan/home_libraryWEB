"use client";
import { useEffect, useState } from "react";
import { AuthorTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAuthorsAndBooksCount } from "@/app/_api/services/authorService";

const CategoryTablePage = () => {
  const [categories, setcCtegories] = useState<AuthorTableModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAuthorsAndBooksCount();

      if (res.status !== 200) {
        throw new Error("Yazar ile ilgili bir hata oluştu");
      }

      const response = res.data;
      console.log(response);
      setcCtegories(response);
    } catch (error) {
      console.log("Yazar try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoryTablePage;
