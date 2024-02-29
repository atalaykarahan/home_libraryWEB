import { getInsertPublisherClient } from "@/app/_api/services/publisherService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

const CreatePublisher: React.FC = ({}) => {
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
      toast("Event has been created");

      console.log("başarılı");
    }
  };
  return (
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
                  <Input {...field} placeholder="SÖZCÜ KİTABEVİ" type="text" />
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
  );
};

export default CreatePublisher;
