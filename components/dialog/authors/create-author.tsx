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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateAuthorSchema } from "@/schemas/author";
import { getInsertAuthorClient } from "@/app/_api/services/authorService";

const CreateAuthor: React.FC = ({}) => {
  const form = useForm<z.infer<typeof CreateAuthorSchema>>({
    resolver: zodResolver(CreateAuthorSchema),
    defaultValues: {
      author_name: "",
      author_surname: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateAuthorSchema>) => {
    const res = await getInsertAuthorClient(
      values.author_name,
      values.author_surname
    );
    if (res.status == 201) {
      form.reset();
      toast("Event has been created");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        {/* <FormError message={errorMessage} />
            <FormSuccess message={successMessage} /> */}
        <Button type="submit" className="w-full">
          Oluştur
        </Button>
      </form>
    </Form>
  );
};

export default CreateAuthor;
