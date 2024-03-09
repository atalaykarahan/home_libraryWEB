"use client";
import {
  deleteAuthorClient,
  patchAuthorClient,
} from "@/app/_api/services/authorService";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbDots } from "react-icons/tb";
import { z } from "zod";
import { eventEmitter } from "../create-author";
import PatchCaller from "@/api-caller/patch-caller";
import DeleteCaller from "@/api-caller/delete-caller";

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

      //#region EDIT & UPDATE & PATCH AUTHOR
      const handleEditOnSubmit = async (
        data: z.infer<typeof EditAuthorSchema>
      ) => {
        PatchCaller({
          apiCall: patchAuthorClient(
            author.author_id,
            data.author_name,
            data.author_surname
          ),
          eventEmitter: eventEmitter,
          emitterFnc: "updateGrid",
          description: "Yazar başarıyla güncellendi",
        });
        setEditAuthorDialog(false);
      };
      //#endregion

      //#region DELETE AUTHOR
      const handleDeleteAuthor = async () => {
        DeleteCaller({
          apiCall: deleteAuthorClient(author.author_id),
          eventEmitter: eventEmitter,
          emitterFnc: "updateGrid",
        });
      };
      //#endregion

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
                              <Input {...field} type="text" />
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
                              <Input {...field} type="text" />
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
                  {author.author_name} {author.author_surname} yazarını kalıcı
                  olarak silmek istediğine emin misin?
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
