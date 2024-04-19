import { getInsertPublisherClient } from "@/app/_api/services/publisherService";
import { Button } from "@/components/ui/button";
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
import EventEmitter from "events";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const eventEmitter = new EventEmitter();

const CreatePublisher: React.FC = ({}) => {
  const form = useForm<z.infer<typeof CreatePublisherSchema>>({
    resolver: zodResolver(CreatePublisherSchema),
    defaultValues: {
      publisher_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePublisherSchema>) => {
    try {
      const res = await getInsertPublisherClient(values.publisher_name);
      if (res.status == 201) {
        form.reset();
        eventEmitter.emit("updateGrid");
        toast.success(`YENİ YAYINEVİ EKLENDİ`, {
          description: `${values.publisher_name}`,
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
        console.log("cratePublisher ile ilgili bir hata oluştu");
      }
    } catch (error: any) {
      if (error.message == "This publisher already exists.") {
        toast.error(`HATA`, {
          description:
            "Bu yayınevi zaten daha önceden eklenmiş lütfen yeni bir tane ekleyin",
          position: "top-right",
        });
      } else if (error.message == "Request failed with status code 401") {
        toast.error(`GEÇERSİZ YETKİ`, {
          description: `Bu işlemi yapabilmeniz için yetkiniz yeterli değil!`,
          position: "top-right",
        });
      } else {
        toast.error(`HATA`, {
          description: `${error}`,
          position: "top-right",
        });
        console.log(error);
      }
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
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Oluştur
        </Button>
      </form>
    </Form>
  );
};

export default CreatePublisher;
