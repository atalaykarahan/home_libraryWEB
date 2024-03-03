"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TbDots } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import {
  getMyReading,
  removeMyBook,
  updateMyReadingClient,
} from "@/app/_api/services/readingService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Status } from "@/app/_models/status";
import { getMyStatusesClient } from "@/app/_api/services/statusService";
import { EditMyReadingSchema } from "@/schemas/reading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MyBookTablePage from "./my-book-table-page";
import EventEmitter from "events";

export type MyBookTableModel = {
  reading_id: number;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

const removeBook = async (reading_id: number) => {
  console.log("kaldırılacak olan reading =", reading_id);
  const resRemoveBook = await removeMyBook(reading_id);
  if (resRemoveBook.status !== 200) {
    throw new Error("Reading silinirken bir hata oluştu");
  } else {
    console.log("silme işlemi başarılı tabloyu yenilemen lazım");
  }
};
export const eventEmitter = new EventEmitter();

export const columns: ColumnDef<MyBookTableModel>[] = [
  {
    accessorKey: "book_title",
    header: "Kitap",
  },
  {
    accessorKey: "author",
    header: "Yazar",
  },
  {
    accessorKey: "publisher",
    header: "Yayınevi",
  },
  {
    accessorKey: "status",
    header: "Durumu",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const myBook = row.original;
      const [removeBookDialog, setRemoveBookDialog] = useState(false);
      const [openReadingDialog, setOpenReadingDialog] = useState(false);
      const [statusPopover, setStatusPopover] = useState(false);
      const [statuses, setStatuses] = useState<Status[]>([]);

      const form = useForm<z.infer<typeof EditMyReadingSchema>>({
        resolver: zodResolver(EditMyReadingSchema),
      });

      useEffect(() => {
        if (openReadingDialog) {
          fetchData();
        }
      }, [openReadingDialog]);

      const fetchData = async () => {
        //#region  Get statuses for select box
        const resStatus = await getMyStatusesClient();
        if (resStatus.status !== 200) {
          throw new Error("Statuses ile ilgili bir hata oluştu");
        }
        setStatuses(resStatus.data);
        //#endregion

        //#region reading info
        const resReading = await getMyReading(myBook.reading_id);
        if (resReading.status !== 200) {
          throw new Error("Reading ile ilgili bir hata oluştu");
        }
        if (resReading.data.comment)
          form.setValue("comment", resReading.data.comment);

        //#endregion
      };

      const onSubmit = async (data: z.infer<typeof EditMyReadingSchema>) => {
        try {
          console.log(data, myBook.reading_id);
          const resStatus = await updateMyReadingClient(
            myBook.reading_id,
            parseInt(data.status_id ?? "0"),
            data.comment
          );
          if (resStatus.status === 200) {
            //this is for update grid
            eventEmitter.emit("updateGrid");

            setOpenReadingDialog(false);
            toast.success(`GÜNCELLEME BAŞARILI`,{
              description: `${myBook.book_title}`,
              position: "top-right",
              style:{
                backgroundColor:"hsl(143, 85%, 96%)",
                color:"hsl(140, 100%, 27%)",
                borderColor:"hsl(145, 92%, 91%)",
              }
            });
          }
          console.log("dönen yanıt şu şekilde --> ", resStatus);
        } catch (error) {
          console.warn("addMyReading try&catch hata -> ", error);
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
              <DropdownMenuItem onClick={() => setOpenReadingDialog(true)}>
                Aç
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRemoveBookDialog(true)}>
                Kitaplığımdan Kaldır
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Edit reading dialog */}
          <Dialog
            open={openReadingDialog}
            onOpenChange={() => {
              setOpenReadingDialog(false), form.reset();
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kitap: {myBook.book_title}</DialogTitle>
                <DialogDescription>Yazar: {myBook.author}</DialogDescription>

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
                            <Popover
                              open={statusPopover}
                              onOpenChange={setStatusPopover}
                            >
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
                                      : myBook.status}
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
                                          setStatusPopover(false);
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
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notlarım</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Notların..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Kaydet
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* delete book dialog */}
          <AlertDialog
            open={removeBookDialog}
            onOpenChange={() => setRemoveBookDialog(false)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  "{myBook.book_title}" kitabını kitaplığından kaldırmak
                  istediğine emin misin?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Eğer bu kitap hakkında herhangi bir notun varsa bunlar silinir
                  ve bir daha geri getiremezsin! Bu işlem kitabı yalnızca
                  kitaplığından kaldıracaktır. Kitabı daha sonra kütüphaneden
                  yeniden ekleyebilirsin.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={() => removeBook(myBook.reading_id)}
                >
                  Kaldır
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
