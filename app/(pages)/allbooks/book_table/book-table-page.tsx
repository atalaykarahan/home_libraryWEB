"use client";
import { useEffect, useState } from "react";
import { BookTableModel, columns, eventEmitter } from "./columns";
import { DataTable } from "./data-table";
import { getAllBooksClient } from "@/app/_api/services/bookService";

const BookTablePage = () => {
  const [books, setBooks] = useState<BookTableModel[]>([]);

  useEffect(() => {
    fetchData();
     //this is for when user update his reading;
     eventEmitter.on("updateGrid", fetchData);
     return () => {
       eventEmitter.off("updateGrid", fetchData);
     };
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllBooksClient();

      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }

      //we formatted response type for table component
      const formattedResponse = res.data.map((b:any) => {
        const myFormat = {
          book_id: b.book_id,
          book_title: b.book_title,
          author: b.AUTHOR.author_name + " " + (b.AUTHOR.author_surname == null ? "" : b.AUTHOR.author_surname),
          publisher: b.PUBLISHER == null ? "" : b.PUBLISHER.publisher_name,
          status: b.STATUS.status_name
        }
        return myFormat
      });

      // const response = res.data;
      setBooks(formattedResponse);
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
