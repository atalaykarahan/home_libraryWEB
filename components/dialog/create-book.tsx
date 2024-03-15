import { getAllAuthorsSelectClient } from "@/app/_api/services/authorService";
import { getCategories } from "@/app/_api/services/categoryService";
import { getAllPublisherClient } from "@/app/_api/services/publisherService";
import { getAllStatusesClient } from "@/app/_api/services/statusService";
import { Category } from "@/app/_models/category";
import { Publisher } from "@/app/_models/publisher";
import { Status } from "@/app/_models/status";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CreateBookSchema } from "@/schemas/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Textarea } from "../ui/textarea";
import { postInsertBookClient } from "@/app/_api/services/bookService";
import { InsertBook } from "@/app/_models/book";
import { toast } from "sonner";
import EventEmitter from "events";

export const eventEmitter = new EventEmitter();
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
  const [openPublishers, setOpenPublishers] = useState(false)
  //category
  const [categories, setCategories] = useState<Option[]>([]);
  //author
  const [authors, setAuthors] = useState<Option[]>([]);
  const [openAuthors, setOpenAuthors] = useState(false)
  //status
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [openStatuses, setOpenStatuses] = useState(false)

  useEffect(() => {
    fetchData();
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
      console.warn("fetchData try&catch hata -> ", error);
    }
  };

  const form = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      book_title: "",
      book_summary: "",
      categories: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateBookSchema>) => {
    try {
      const newBook: InsertBook = {
        book_title: data.book_title,
        author_id: data.author_id,
        publisher_id: data.publisher_id ?? "",
        status_id: data.status_id,
        categories_id: data.categories.map((category: any) => category.key),
        book_summary: data.book_summary,
      };
      console.log("kitap bu ", newBook);
      const resInsertBook = await postInsertBookClient(newBook);
      if (resInsertBook.status == 201) {
        form.reset();
        toast.success(`KİTAP BAŞARIYLA EKLENDİ`, {
          position: "top-right",
          style: {
            backgroundColor: "hsl(143, 85%, 96%)",
            color: "hsl(140, 100%, 27%)",
            borderColor: "hsl(145, 92%, 91%)",
          },
        });
        eventEmitter.emit("updateGrid");
      } else {
        toast.error(`Bir hata meydana geldi`, {
          description: `Daha sonra tekrar deneyin!`,
          position: "top-right",
        });
        throw new Error("Book eklenirken bir hata oluştu");
      }
    } catch (error) {
      toast.error(`HATA`, {
        description: `${error}`,
        position: "top-right",
      });
      throw new Error(`createBookError try&catch hata -> ${error}`);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="md:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Kitap Ekle</DialogTitle>
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
                    <Popover open={openPublishers} onOpenChange={setOpenPublishers}>
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
                                  setOpenPublishers(false);

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
                    <Popover open={openAuthors} onOpenChange={setOpenAuthors}>
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
                                  setOpenAuthors(false);
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
                    <Popover open={openStatuses} onOpenChange={setOpenStatuses}>
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
                                  setOpenStatuses(false);
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

              {/* summary */}
              <FormField
                control={form.control}
                name="book_summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Özet</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Kitabın özeti"
                        className="resize-none"
                        {...field}
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
