"use client";
import { useEffect, useState } from "react";
import { Publisher } from "../../../../app/_models/publisher";
import { PublisherTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getPublishersAndBooksCount } from "@/app/_api/services/publisherService";

const PublisherTablePage = () => {
  const [publishers, setPublishers] = useState<PublisherTableModel[]>([]);

  useEffect(() => {
    fetchData();
    console.log("Kitap ekleme çalıştı");
  }, []);

  const fetchData = async () => {
    try {
      const res = await getPublishersAndBooksCount();

      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }

      const response = res.data;
      console.log(response);
      setPublishers(response);
    } catch (error) {
      console.log("publisher try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={publishers} />
    </div>
  );
};

export default PublisherTablePage;
