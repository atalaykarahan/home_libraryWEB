"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Publisher } from "../../../../app/_models/publisher"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns: ColumnDef<Publisher>[] = [
  {
    accessorKey: "publisher_name",
    header: "Yayınevi",
  },
]
