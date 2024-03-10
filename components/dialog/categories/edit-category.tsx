import PatchCaller from "@/api-caller/patch-caller";
import { patchCategoryClient } from "@/app/_api/services/categoryService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditCategorySchema } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategoryTableModel } from "./category_table/columns";
import { eventEmitter } from "./create-category";

interface EditCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: CategoryTableModel;
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const form = useForm<z.infer<typeof EditCategorySchema>>({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: {
      category_name: category.category_name,
    },
  });

  //#region EDIT & UPDATE & PATCH AUTHOR
  const handleEditOnSubmit = async (
    data: z.infer<typeof EditCategorySchema>
  ) => {
    PatchCaller({
      apiCall: patchCategoryClient(
        category.category_id.toString(),
        data.category_name
      ),
      eventEmitter: eventEmitter,
      emitterFnc: "updateGrid",
      description: "Kategori başarıyla güncellendi",
    });
    setIsOpen(false);
  };
  //#endregion

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kategori düzenle</DialogTitle>
          <DialogDescription>{category.category_name}</DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditOnSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="category_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
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
  );
};

export default EditCategoryDialog;
