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
import EventEmitter from "events";

export const eventEmitter = new EventEmitter();

const CreateCategory: React.FC = ({}) => {
  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      category_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateCategorySchema>) => {
    try {
      const res = await getInsertCategoryClient(values.category_name);
      if (res.status == 201) {
        form.reset();
        eventEmitter.emit("updateGrid");
        toast.success(`YENİ KATEGORİ EKLENDİ`, {
          description: `${values.category_name}`,
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
        console.log("crateCategory ile ilgili bir hata oluştu");
      }
    } catch (error: any) {
      if (error.response.data.error == "This category already exists.") {
        toast.error(`HATA`, {
          description:
            "Bu kategori zaten daha önceden eklenmiş lütfen yeni bir tane ekleyin",
          position: "top-right",
        });
      } else {
        toast.error(`HATA`, {
          description: `${error}`,
          position: "top-right",
        });
        console.log(`crateCategory try&catch hata -> ${error}`);
      }
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

export default CreateCategory;
