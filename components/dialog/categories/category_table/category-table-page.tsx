"use client";
import { useEffect, useState } from "react";
import { CategoryTableModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { getCategoriesAndBooksCount } from "@/app/_api/services/categoryService";
import { eventEmitter } from "../create-category";

const CategoryTablePage = () => {
  const [categories, setcCtegories] = useState<CategoryTableModel[]>([]);

  useEffect(() => {
    fetchData();

    eventEmitter.on("updateGrid", fetchData);
    return () => {
      eventEmitter.off("updateGrid", fetchData);
    };

  }, []);

  const fetchData = async () => {
    try {
      const res = await getCategoriesAndBooksCount();

      if (res.status !== 200) {
        throw new Error("Kategori ile ilgili bir hata oluştu");
      }

      const response = res.data;
      setcCtegories(response);


      
    } catch (error) {
      console.warn("kategori try&catch hata -> ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoryTablePage;
