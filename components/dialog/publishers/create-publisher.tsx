import { getInsertPublisherClient } from "@/app/_api/services/publisherService";
import { Publisher } from "@/app/_models/publisher";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreatePublisherSchema } from "@/schemas/publisher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface CreatePublisherProps {
  openModal: boolean;
  closeModal: () => void;
}
const CreatePublisher: React.FC<CreatePublisherProps> = ({
  openModal,
  closeModal,
}) => {
  const form = useForm<z.infer<typeof CreatePublisherSchema>>({
    resolver: zodResolver(CreatePublisherSchema),
    defaultValues: {
      publisher_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePublisherSchema>) => {
    console.log(values);
    const res = await getInsertPublisherClient(values.publisher_name);
    if (res.status == 201) {
      form.reset();
      toast('Event has been created')
    //   toast.message('Event has been created', {
    //     description: 'Monday, January 3rd at 6:00pm',
    //   })
    //   toast("Event has been created.")
      console.log("başarılı");
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yayınevi Ekle</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="publisher_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yayınevi adı</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="SÖZCÜ KİTABEVİ"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <FormError message={errorMessage} />
            <FormSuccess message={successMessage} /> */}
            <Button type="submit" className="w-full">
              Oluştur
            </Button>
          </form>
        </Form>

        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePublisher;
