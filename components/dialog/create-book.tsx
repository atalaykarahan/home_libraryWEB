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
import { getAllAuthorsSelectClient } from "@/app/_api/services/authorService";
import { Publisher } from "@/app/_models/publisher";
import { Category } from "@/app/_models/category";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { getCategories } from "@/app/_api/services/categoryService";
import { Author } from "@/app/_models/author";
import { Status } from "@/app/_models/status";
import { getAllStatusesClient } from "@/app/_api/services/statusService";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const CreateBook: React.FC<CreateCategoryProps> = ({
  openModal,
  closeModal,
}) => {
  //publisher
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  //category
  const [categories, setCategories] = useState<Option[]>([]);
  //author
  const [authors, setAuthors] = useState<Option[]>([]);
  //status
  const [statuses, setStatuses] = useState<Status[]>([]);

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

      setPublishers(resPublisher.data);
      //#endregion

      //#region author query
      const resAuthor = await getAllAuthorsSelectClient();

      if (resAuthor.status !== 200) {
        throw new Error("author ile ilgili bir hata oluştu");
      }

      // const responseAuthor: Author[] = resPublisher.data;
      setAuthors(resAuthor.data);
      //#endregion

      //#region status query
      const resStatus = await getAllStatusesClient();

      if (resStatus.status !== 200) {
        throw new Error("author ile ilgili bir hata oluştu");
      }

      setStatuses(resStatus.data);
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

  const form = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
  });

  // const [loading, setLoading] = useState(false);

  function onSubmit(data: z.infer<typeof CreateBookSchema>) {
    console.log(data);
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
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? publishers.find(
                                  (p) =>
                                    p.publisher_id.toString() == field.value
                                )?.publisher_name
                              : "Yayınevi seçiniz."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0"
                        style={{ maxHeight: "15rem", overflow: "auto" }}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Yayınevi ara..."
                            className="h-9"
                          />
                          <CommandEmpty>Yayınevi bulunamadı.</CommandEmpty>
                          <CommandGroup>
                            {publishers.map((p) => (
                              <CommandItem
                                value={p.publisher_name}
                                key={p.publisher_id}
                                onSelect={() => {
                                  form.setValue(
                                    "publisher_id",
                                    p.publisher_id.toString()
                                  );
                                }}
                              >
                                {p.publisher_name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    p.publisher_id.toString() == field.value
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

              {/* author  */}
              <FormField
                control={form.control}
                name="author_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Yazar</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? authors.find(
                                  (author) => author.value == field.value
                                )?.label
                              : "Yazar seçiniz."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0"
                        style={{ maxHeight: "15rem", overflow: "auto" }}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Yazar ara..."
                            className="h-9"
                          />
                          <CommandEmpty>Yazar bulunamadı.</CommandEmpty>
                          <CommandGroup>
                            {authors.map((author) => (
                              <CommandItem
                                value={author.label}
                                key={author.value}
                                onSelect={() => {
                                  form.setValue("author_id", author.value);
                                }}
                              >
                                {author.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    author.value == field.value
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

              {/* status  */}
              <FormField
                control={form.control}
                name="status_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Durum</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? statuses.find(
                                  (status) =>
                                    status.status_id.toString() == field.value
                                )?.status_name
                              : "Durum seçiniz."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0"
                        style={{ maxHeight: "15rem", overflow: "auto" }}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Durum ara..."
                            className="h-9"
                          />
                          <CommandEmpty>Durum bulunamadı.</CommandEmpty>
                          <CommandGroup>
                            {statuses.map((status) => (
                              <CommandItem
                                value={status.status_name}
                                key={status.status_id}
                                onSelect={() => {
                                  form.setValue(
                                    "status_id",
                                    status.status_id.toString()
                                  );
                                }}
                              >
                                {status.status_name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    status.status_id.toString() == field.value
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateBook;
