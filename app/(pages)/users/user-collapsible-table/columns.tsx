"use client";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type UserCollapsibleModel = {
  book_id: string;
  book_title: string;
  image_path: string;
  status: string;
};

export const columns: ColumnDef<UserCollapsibleModel>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="w-[50px]">
          <AspectRatio ratio={7 / 11} className="flex flex-row">
            <Image
              src="https://img.kitapyurdu.com/v1/getImage/fn:1109383/wh:true/wi:220"
              width={220}
              height={310}
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      );
    },
  },
  {
    accessorKey: "book_title",
    header: "Kitap Adı",
  },
  {
    header: "Durumu",
    cell: ({ row }) => {
      const book = row.original;
      return book.status == "Okundu" ? (
        <Badge variant="success">{book.status}</Badge>
      ) : book.status == "Okunuyor" ? (
        <Badge variant="warning">{book.status}</Badge>
      ) : (
        <Badge variant="destructive">{book.status}</Badge>
      );
    },
  },
];
