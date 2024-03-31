"use client";
import { useEffect, useState } from "react";
import { MyBookTableModel, columns, eventEmitter } from "./columns";
import { DataTable } from "./data-table";
import { getMyBooks } from "@/app/_api/services/readingService";

const MyBookTablePage = () => {
  const [myBooks, setMyBooks] = useState<MyBookTableModel[]>([]);

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
      const res = await getMyBooks();

      if (res.status !== 200) {
        throw new Error("Reading ile ilgili bir hata oluştu");
      }
      //we formatted response type for table component
      const formattedResponse = res.data.map((m: any) => {
        const myFormat = {
          book_image: m.BOOK.book_image,
          reading_id: m.reading_id,
          book_id: m.BOOK.book_id,
          book_title: m.BOOK.book_title,
          author:
            m.BOOK.AUTHOR.author_name +
            " " +
            (m.BOOK.AUTHOR.author_surname == null
              ? ""
              : m.BOOK.AUTHOR.author_surname),
          publisher:
            m.BOOK.PUBLISHER == null ? "" : m.BOOK.PUBLISHER.publisher_name,
          status: m.STATUS.status_name,
        };
        return myFormat;
      });
      setMyBooks(formattedResponse);
    } catch (error) {
      console.warn("publisher try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={myBooks} />
    </div>
  );
};

export default MyBookTablePage;
