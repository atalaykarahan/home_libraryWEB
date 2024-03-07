"use client";
import { useEffect, useState } from "react";
import { AuthorTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAuthorsAndBooksCount } from "@/app/_api/services/authorService";
import { eventEmitter } from "../create-author";

const CategoryTablePage = () => {
  const [authors, setAuthors] = useState<AuthorTableModel[]>([]);

  useEffect(() => {
    fetchData();

    eventEmitter.on("updateGrid", fetchData);
    return () => {
      eventEmitter.off("updateGrid", fetchData);
    };
  }, []);

  const fetchData = async () => {
    try {
      console.log("tetiklendi");
      const res = await getAuthorsAndBooksCount();

      if (res.status !== 200) {
        throw new Error("Yazar ile ilgili bir hata oluştu");
      }

      setAuthors(res.data);
    } catch (error) {
      console.warn("Yazar try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={authors} />
    </div>
  );
};

export default CategoryTablePage;
