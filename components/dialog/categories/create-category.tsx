import { getInsertCategoryClient } from "@/app/_api/services/categoryService";
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
import { CreateCategorySchema } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateCategory: React.FC = ({}) => {
  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      category_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateCategorySchema>) => {
    console.log(values);
    const res = await getInsertCategoryClient(values.category_name);
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
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Adı</FormLabel>
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

export default CreateCategory;
