import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateBookSchema } from "@/schemas/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getAllPublisherClient } from "@/app/_api/services/publisherService";
import { Publisher } from "@/app/_models/publisher";
import { Category } from "@/app/_models/category";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { getCategories } from "@/app/_api/services/categoryService";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const CreateBook: React.FC<CreateCategoryProps> = ({
  openModal,
  closeModal,
}) => {
  //#region default page value

  //#region use state
  //publisher
  const [openPublisher, setOpenPublisher] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [publishers, setPublishers] = useState<Option[]>([]);

  //category
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    fetchData();
    console.log("Kitap ekleme çalıştı");
  }, [openModal]);

  const fetchData = async () => {
    try {
      //#region publisher query
      const resPublisher = await getAllPublisherClient();

      if (resPublisher.status !== 200) {
        throw new Error("publisher ile ilgili bir hata oluştu");
      }

      const responsePublisher: Publisher[] = resPublisher.data;
      console.table(responsePublisher);

      const transformedPublishers = responsePublisher.map((publisher) => ({
        label: publisher.publisher_name,
        value: publisher.publisher_id?.toString() ?? "0",
      }));

      if (transformedPublishers) {
        setPublishers(transformedPublishers);
      }

      //#endregion

      //#region category query
      const resCategory = await getCategories();
      if (resCategory.status !== 200) {
        throw new Error("category ile ilgili bir hata oluştu");
      }
      const responseCategory: Category[] = resCategory.data;

      const transformedCategories = responseCategory.map((category) => ({
        label: category.category_name,
        value: category.category_name,
        key: category.category_id.toString(),
      }));

      if (transformedCategories) {
        setCategories(transformedCategories);
      }
      //#endregion
    } catch (error) {
      console.log("fetchData try&catch hata -> ", error);
    }
  };

  // const form = useForm<z.infer<typeof CreateBookSchema>>({
  //   resolver: zodResolver(CreateBookSchema),
  //   defaultValues: {
  //     book_title: "",
  //     author_id: 0,
  //     publisher_id: 0,
  //     status_id: 0,
  //     book_summary: "",
  //   },
  // });

  // const onSubmit = (values: z.infer<typeof CreateBookSchema>) => {
  //   console.log(values);
  // };

  //#endregion

  // const OPTIONS: Option[] = [
  //   { label: "nextjs", value: "Nextjs", key: "1" },
  //   { label: "React", value: "react", key: "3" },
  //   { label: "Remix", value: "remix", key: "4" },
  //   { label: "Vite", value: "vite" },
  //   { label: "Nuxt", value: "nuxt" },
  //   { label: "Vue", value: "vue" },
  //   { label: "Svelte", value: "svelte" },
  //   { label: "Angular", value: "angular" },
  //   { label: "Ember", value: "ember", disable: true },
  //   { label: "Gatsby", value: "gatsby", disable: true },
  //   { label: "Astro", value: "astro" },
  // ];

  // const optionSchema = z.object({
  //   label: z.string(),
  //   value: z.string(),
  //   key:z.string().optional(),
  //   disable: z.boolean().optional(),
  // });

  // const FormSchema = z.object({
  //   frameworks: z.array(optionSchema).min(1),
  // });

  // const languages = [
  //   { label: "English", value: "en" },
  //   { label: "French", value: "fr" },
  //   { label: "German", value: "de" },
  //   { label: "Spanish", value: "es" },
  //   { label: "Portuguese", value: "pt" },
  //   { label: "Russian", value: "ru" },
  //   { label: "Japanese", value: "ja" },
  //   { label: "Korean", value: "ko" },
  //   { label: "Chinese", value: "zh" },
  // ] as const

  const form = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
  });

  const [loading, setLoading] = useState(false);

  function onSubmit(data: z.infer<typeof CreateBookSchema>) {
    // setLoading(true);
    console.log(data);

    // setTimeout(() => {
    //   setLoading(false);
    //   toast({
    //     title: 'Your submitted data',
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //     ),
    //   });
    // }, 500);
  }

  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kitap Ekle</DialogTitle>
          <DialogDescription>açıklama kısmı</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* book name */}
              <FormField
                control={form.control}
                name="book_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kitap Adı</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ömer seyfettinin kaşağı"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* publisher  */}
              <FormField
                control={form.control}
                name="publisher_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Yayınevi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? publishers.find((p) => p.value === field.value)
                                  ?.label
                              : "Select language"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {publishers.map((p) => (
                              <CommandItem
                                value={p.label}
                                key={p.value}
                                onSelect={() => {
                                  form.setValue("publisher_id", p.value);
                                }}
                              >
                                {p.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    p.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* categories */}
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoriler</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={categories}
                        placeholder="Kitaba uygun kategorileri seçiniz.."
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            kategori bulunamadı.
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Oluştur
              </Button>
            </div>
          </form>
        </Form>

        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="book_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kitap Adı</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="krhnatalay" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisher_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Yayınevi</FormLabel>
                    <Popover
                      open={openPublisher}
                      onOpenChange={setOpenPublisher}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPublisher}
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {value !== 0
                              ? publishers.find((p) => p.publisher_id == value)
                                  ?.publisher_name
                              : "Yayınevi için ara..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Yayınevi ara..."
                            className="h-9"
                          />
                          <CommandEmpty>Yayınevi bulunamadı.</CommandEmpty>
                          <CommandGroup>
                            {publishers.map((p) => (
                              <CommandItem
                                key={p.publisher_id}
                                value={p.publisher_name}
                                onSelect={(currentValue) => {
                                  const selectedPublisherValue =
                                    publishers.find(
                                      (p) =>
                                        p.publisher_name.toLowerCase() ==
                                        currentValue
                                    )?.publisher_id ?? 0;
                                  setValue(
                                    selectedPublisherValue == value
                                      ? 0
                                      : selectedPublisherValue
                                  );
                                  setOpenPublisher(false);
                                }}
                              >
                                {p.publisher_name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value == p.publisher_id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durumu</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="book_summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Özeti</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <FormError message={errorMessage} />
            <FormSuccess message={successMessage} /> 
            <Button type="submit" className="w-full">
              Oluştur
            </Button>
          </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateBook;
