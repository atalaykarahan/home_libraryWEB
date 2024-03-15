import PatchCaller from "@/api-caller/patch-caller";
import { patchPublisherClient } from "@/app/_api/services/publisherService";
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
import { EditPublisherSchema } from "@/schemas/publisher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventEmitter } from "./create-publisher";
import { PublisherTableModel } from "./publisher_table/columns";

interface EditPublisherDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publisher: PublisherTableModel;
}

const EditPublisherDialog: React.FC<EditPublisherDialogProps> = ({
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

  //#region EDIT & UPDATE & PATCH AUTHOR
  const handleEditOnSubmit = async (
    data: z.infer<typeof EditPublisherSchema>
  ) => {
    PatchCaller({
      apiCall: patchPublisherClient(
        publisher.publisher_id.toString(),
        data.publisher_name
      ),
      eventEmitter: eventEmitter,
      emitterFnc: "updateGrid",
      description: "Yayınevi başarıyla güncellendi",
    });
    setIsOpen(false);
  };
  //#endregion

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yayınevi düzenle</DialogTitle>

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

export default EditPublisherDialog;
