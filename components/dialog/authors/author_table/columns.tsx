"use client";

import { deleteAuthorClient, patchAuthorClient } from "@/app/_api/services/authorService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditAuthorSchema } from "@/schemas/author";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import EventEmitter from "events";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbDots } from "react-icons/tb";
import { toast } from "sonner";
import { z } from "zod";
import { eventEmitter } from "../create-author";



export type AuthorTableModel = {
  author_id: string;
  author_name: string;
  author_surname: string;
  bookCount: number;
};

export const columns: ColumnDef<AuthorTableModel>[] = [
  {
    accessorKey: "author_name",
    header: "Adı",
  },
  {
    accessorKey: "author_surname",
    header: "Soyadı",
  },
  {
    accessorKey: "bookCount",
    header: "Kitap Sayısı",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const author = row.original;
      const [editAuthorDialog, setEditAuthorDialog] = useState<boolean>(false);
      const [deleteAuthorDialog, setDeleteAuthorDialog] =
        useState<boolean>(false);

      const form = useForm<z.infer<typeof EditAuthorSchema>>({
        resolver: zodResolver(EditAuthorSchema),
        defaultValues: {
          author_name: author.author_name,
          author_surname: author.author_surname,
        },
      });

      const handleEditOnSubmit = async (
        data: z.infer<typeof EditAuthorSchema>
      ) => {
        try {
          const res = await patchAuthorClient(
            author.author_id,
            data.author_name,
            data.author_surname
          );

          if (res.status == 200) {
            eventEmitter.emit("updateGrid");
            setEditAuthorDialog(false);
            toast.success(`GÜNCELLEME BAŞARILI`, {
              description: `${author.author_name}`,
              position: "top-right",
              style: {
                backgroundColor: "hsl(143, 85%, 96%)",
                color: "hsl(140, 100%, 27%)",
                borderColor: "hsl(145, 92%, 91%)",
              },
            });
          } else {
            toast.error(`Bir hata meydana geldi`, {
              description: `Daha sonra tekrar deneyin!`,
              position: "top-right",
            });
            throw new Error(`updateAuthor error -> ${res}`);
          }
        } catch (error) {
          toast.error(`HATA`, {
            description: `${error}`,
            position: "top-right",
          });
          throw new Error(`updateAuthor try&catch hata -> ${error}`);
        }
      };

      const handleDeleteAuthor = async () => {
        try {
          console.log("id değeri burdaaa---",author.author_id);;
          const res = await deleteAuthorClient(author.author_id);
          console.log(res);
          if (res.status == 204) {
            eventEmitter.emit("updateGrid");
            toast.success(`YAZAR BAŞARIYLA SİLİNDİ`, {
              position: "top-right",
              style: {
                backgroundColor: "hsl(143, 85%, 96%)",
                color: "hsl(140, 100%, 27%)",
                borderColor: "hsl(145, 92%, 91%)",
              },
            });
          } else {
            toast.error(`Bir hata meydana geldi`, {
              description: `Daha sonra tekrar deneyin!`,
              position: "top-right",
            });
            throw new Error("deleteAuthor ile ilgili bir hata oluştu");
          }
        } catch (error: any) {
          console.log(error.response);
          switch (error.response.status) {
            case 403:
              toast.error(`YETKİ HATASI`, {
                description: `Bu yazarı silebilmek için yetkininiz bulunmamaktadır.`,
                position: "top-right",
              });
              break;
            case 409:
              toast.error(`YAZAR KULLANIMDA`, {
                description: `Bu yazara ait şu anda bir kitap bulunmakta. Yazarı silebilmek için önce ilişkili kitapları sildiğinizden emin olun!`,
                position: "top-right",
              });
              break;
          }

          throw new Error(`deleteAuthor try&catch hata -> ${error}`);
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
              <DropdownMenuItem onClick={() => setEditAuthorDialog(true)}>
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteAuthorDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* EDIT AUTHOR DIALOG */}
          <Dialog
            open={editAuthorDialog}
            onOpenChange={() => setEditAuthorDialog(false)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yazar düzenle</DialogTitle>
                <DialogDescription>
                  {author.author_name} {author.author_surname}
                </DialogDescription>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleEditOnSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="author_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yazar Adı</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="author_surname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yazar Soyadı</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            {/* <FormMessage /> */}
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

          {/* DELETE AUTHOR DIALOG */}
          <AlertDialog
            open={deleteAuthorDialog}
            onOpenChange={() => setDeleteAuthorDialog(false)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {author.author_name} {author.author_surname} yazarını kalıcı olarak silmek
                  istediğine emin misin?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Bu yazarı silersen bu işlemi geri alamzsın!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteAuthor()}>
                  Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
