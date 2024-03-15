import { getInsertAuthorClient } from "@/app/_api/services/authorService";
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
import { CreateAuthorSchema } from "@/schemas/author";
import { zodResolver } from "@hookform/resolvers/zod";
import EventEmitter from "events";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const eventEmitter = new EventEmitter();

const CreateAuthor: React.FC = ({}) => {
  const form = useForm<z.infer<typeof CreateAuthorSchema>>({
    resolver: zodResolver(CreateAuthorSchema),
    defaultValues: {
      author_name: "",
      author_surname: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateAuthorSchema>) => {
    try {
      const res = await getInsertAuthorClient(
        values.author_name,
        values.author_surname
      );
      if (res.status == 201) {
        form.reset();
        eventEmitter.emit("updateGrid");
        toast.success(`YENİ YAZAR EKLENDİ`, {
          description: `${values.author_name} ${values.author_surname}`,
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
        throw new Error("createAuthor ile ilgili bir hata oluştu");
      }
    } catch (error) {
      toast.error(`HATA`, {
        description: `${error}`,
        position: "top-right",
      });
      throw new Error(`crateAuthor try&catch hata -> ${error}`);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-11/12 sm:w-auto lg:w-fit create-author_form">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="author_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yazar Adı</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Korku" type="text" />
                </FormControl>
                <FormMessage />
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
                  <Input {...field} placeholder="Korku" type="text" />
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

export default CreateAuthor;
