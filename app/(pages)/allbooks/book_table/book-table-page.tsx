"use client";
import { useEffect, useState } from "react";
import { Publisher } from "../../../_models/publisher";
import { BookTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllBooksClient } from "@/app/_api/services/bookService";

const BookTablePage = () => {
  const [books, setBooks] = useState<BookTableModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllBooksClient();

      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }

      console.log(res.data);
      // const formattedResponse:BookTableModel[] =

      const test = res.data.map((b:any) => {
        const allah = {
          text: b.book_title,
        }
        return allah
      });

      console.log("benim deneme kısmı",test);

      const response = res.data;
      setBooks(response);
    } catch (error) {
      console.warn("publisher try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={books} />
    </div>
  );
};



export default BookTablePage;
