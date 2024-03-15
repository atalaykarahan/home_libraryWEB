"use client";
import { getPublishersAndBooksCount } from "@/app/_api/services/publisherService";
import { useEffect, useState } from "react";
import { eventEmitter } from "../create-publisher";
import { PublisherTableModel, columns } from "./columns";
import { DataTable } from "./data-table";

const PublisherTablePage = () => {
  const [publishers, setPublishers] = useState<PublisherTableModel[]>([]);

  useEffect(() => {
    fetchData();

    eventEmitter.on("updateGrid", fetchData);
    return () => {
      eventEmitter.off("updateGrid", fetchData);
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await getPublishersAndBooksCount();

      if (res.status !== 200) {
        throw new Error("Publihser ile ilgili bir hata oluştu");
      }

      console.log(res);
      const response = res.data;
      setPublishers(response);
    } catch (error) {
      console.warn("publisher try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={publishers} />
    </div>
  );
};

export default PublisherTablePage;
