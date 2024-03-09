import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditPublisherSchema } from "@/schemas/publisher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PublisherTableModel } from "./publisher_table/columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormEditProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publisher: PublisherTableModel;
}

const FormEdit: React.FC<FormEditProps> = ({
  isOpen,
  setIsOpen,
  publisher,
}) => {
  const form = useForm<z.infer<typeof EditPublisherSchema>>({
    resolver: zodResolver(EditPublisherSchema),
    defaultValues: {
      publisher_name: publisher.publisher_name,
    },
  });

  const handleEditOnSubmit = async (
    data: z.infer<typeof EditPublisherSchema>
  ) => {
    // try {
    //   const res = await patchCategoryClient(
    //     category.category_id.toString(),
    //     data.category_name
    //   );

    //   if (res.status == 200) {
    //     eventEmitter.emit("updateGrid");
    //     setEditCategoryDialog(false);
    //     toast.success(`GÜNCELLEME BAŞARILI`, {
    //       description: `${category.category_name}`,
    //       position: "top-right",
    //       style: {
    //         backgroundColor: "hsl(143, 85%, 96%)",
    //         color: "hsl(140, 100%, 27%)",
    //         borderColor: "hsl(145, 92%, 91%)",
    //       },
    //     });
    //   } else {
    //     toast.error(`Bir hata meydana geldi`, {
    //       description: `Daha sonra tekrar deneyin!`,
    //       position: "top-right",
    //     });
    //     throw new Error(`updateMyReading error -> ${res}`);
    //   }
    // } catch (error) {
    //   toast.error(`HATA`, {
    //     description: `${error}`,
    //     position: "top-right",
    //   });
    //   throw new Error(`addMyReading try&catch hata -> ${error}`);
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kategori düzenle</DialogTitle>
          <DialogDescription>{publisher.publisher_name}</DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditOnSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="publisher_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Yayınevi</FormLabel>
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

export default FormEdit;
