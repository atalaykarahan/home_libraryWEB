"use client";

import { addMyLibraryClient } from "@/app/_api/services/readingService";
import { getMyStatusesClient } from "@/app/_api/services/statusService";
import { Status } from "@/app/_models/status";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AddMyLibrarySchema } from "@/schemas/reading";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import EventEmitter from "events";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiArrowsDownUp } from "react-icons/pi";
import { TbDots } from "react-icons/tb";
import { toast } from "sonner";
import { z } from "zod";
import DeleteGeneralBookDialog from "../delete-dialog/delete-dialog";

export type BookTableModel = {
  book_image: string;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

export const eventEmitter = new EventEmitter();
export const columns: ColumnDef<BookTableModel>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="w-[50px]">
          <AspectRatio ratio={7 / 11} className="flex flex-row">
            <Image
              src={
                book.book_image ??
                "https://img.freepik.com/premium-vector/manual-book-with-instructions-vector-icon_116137-9345.jpg"
              }
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
    header: "Kitap",
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Yazar
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Yayınevi
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Durumu
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const selectedBook = row.original;
      const [addMyLibrary, setAddMyLibrary] = useState(false);
      const [deleteBookDialog, setDeleteBookDialog] = useState<boolean>(false);
      const [statuses, setStatuses] = useState<Status[]>([]);

      const form = useForm<z.infer<typeof AddMyLibrarySchema>>({
        resolver: zodResolver(AddMyLibrarySchema),
      });

      useEffect(() => {
        if (addMyLibrary) {
          fetchData();
        }
      }, [addMyLibrary]);

      const fetchData = async () => {
        const resStatus = await getMyStatusesClient();

        if (resStatus.status !== 200) {
          throw new Error("author ile ilgili bir hata oluştu");
        }

        //if someone already using this book we should not add it to reading library again
        if (selectedBook.status == "Okunuyor") {
          resStatus.data = resStatus.data.filter(
            (s: any) => s.status_id !== "1"
          );
        }

        setStatuses(resStatus.data);
      };

      const onSubmit = async (data: z.infer<typeof AddMyLibrarySchema>) => {
        try {
          const res = await addMyLibraryClient(
            selectedBook.book_id,
            parseInt(data.status_id)
          );
          if (res.status !== 201) {
            toast.error(`Bir hata meydana geldi`, {
              description: `Daha sonra tekrar deneyin!`,
              position: "top-right",
            });
            throw new Error("addMyLibrary ile ilgili bir hata oluştu");
          } else {
            eventEmitter.emit("updateGrid");
            setAddMyLibrary(false);
            toast.success(`KİTAP KÜTÜPHANENE EKLENDİ`, {
              description: `${selectedBook.book_title}`,
              position: "top-right",
              style: {
                backgroundColor: "hsl(143, 85%, 96%)",
                color: "hsl(140, 100%, 27%)",
                borderColor: "hsl(145, 92%, 91%)",
              },
            });
          }
        } catch (error) {
          toast.error(`HATA`, {
            description: `${error}`,
            position: "top-right",
          });
          throw new Error(`addMyReading try&catch hata -> ${error}`);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <TbDots className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(selectedBook.book_title)
                }
              >
                Bilgi
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setAddMyLibrary(true)}>
                Kitaplığıma Ekle
              </DropdownMenuItem>
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteBookDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* add my library modal */}
          <Dialog
            open={addMyLibrary}
            onOpenChange={() => setAddMyLibrary(false)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedBook.book_title}</DialogTitle>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="status_id"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Durum</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? statuses.find(
                                          (status) =>
                                            status.status_id.toString() ==
                                            field.value
                                        )?.status_name
                                      : "Durum seçiniz."}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="p-0"
                                style={{
                                  maxHeight: "15rem",
                                  overflow: "auto",
                                }}
                              >
                                <Command>
                                  <CommandInput
                                    placeholder="Durum ara..."
                                    className="h-9"
                                  />
                                  <CommandEmpty>Durum bulunamadı.</CommandEmpty>
                                  <CommandGroup>
                                    {statuses.map((status) => (
                                      <CommandItem
                                        value={status.status_name}
                                        key={status.status_id}
                                        onSelect={() => {
                                          form.setValue(
                                            "status_id",
                                            status.status_id.toString()
                                          );
                                        }}
                                      >
                                        {status.status_name}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            status.status_id.toString() ==
                                              field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Oluştur
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* delete book dialog */}
          {deleteBookDialog && (
            <DeleteGeneralBookDialog
              isOpen={deleteBookDialog}
              setIsOpen={setDeleteBookDialog}
              book={selectedBook}
            />
          )}
        </>
      );
    },
  },
];
