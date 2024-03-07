"use client";
import { useEffect, useState } from "react";
import { AuthorTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAuthorsAndBooksCount } from "@/app/_api/services/authorService";

const CategoryTablePage = () => {
  const [authors, setAuthors] = useState<AuthorTableModel[]>([]);

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

      const formattedReponse = res.data.map((a:any) => {
        const myFormat = {
          author_name: a.AUTHOR.author_name,
          author_surname: a.AUTHOR.author_surname,
          bookCount: a.bookCount,
        }
        return myFormat;
      })


      setAuthors(formattedReponse);
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
