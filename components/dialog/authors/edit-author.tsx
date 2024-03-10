import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthorTableModel } from "./author_table/columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { EditAuthorSchema } from "@/schemas/author";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PatchCaller from "@/api-caller/patch-caller";
import { patchAuthorClient } from "@/app/_api/services/authorService";
import { eventEmitter } from "./create-author";

interface EditAuthorDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  author: AuthorTableModel;
}

const EditAuthorDialog: React.FC<EditAuthorDialogProps> = ({
  isOpen,
  setIsOpen,
  author,
}) => {
  const form = useForm<z.infer<typeof EditAuthorSchema>>({
    resolver: zodResolver(EditAuthorSchema),
    defaultValues: {
      author_name: author.author_name,
      author_surname: author.author_surname,
    },
  });

  //#region EDIT & UPDATE & PATCH AUTHOR
  const handleEditOnSubmit = async (data: z.infer<typeof EditAuthorSchema>) => {
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
    setIsOpen(false);
  };
  //#endregion

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
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
  );
};

export default EditAuthorDialog;
