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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from "../ui/multiple-selector";
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
  const [publishers, setPublishers] = useState<Option[]>([]);
  const publisherInputRef = useRef<MultipleSelectorRef>(null);
  //category
  const [categories, setCategories] = useState<Option[]>([]);
  //author
  const [authors, setAuthors] = useState<Option[]>([]);
  const authorInputRef = useRef<MultipleSelectorRef>(null);
  //status
  const [statuses, setStatuses] = useState<Option[]>([]);
  const statusInputRef = useRef<MultipleSelectorRef>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //#region publisher query
        const resPublisher = await getAllPublisherClient();

        if (resPublisher.status !== 200) {
          throw new Error("publisher ile ilgili bir hata oluştu");
        }

        const responsePublisher: Publisher[] = await resPublisher.data;

        const transformedPublishers = responsePublisher.map((publisher) => ({
          label: publisher.publisher_name,
          value: publisher.publisher_name,
          key: publisher.publisher_id.toString(),
        }));

        if (transformedPublishers) setPublishers(transformedPublishers);
        //#endregion

        //#region author query
        const resAuthor = await getAllAuthorsSelectClient();

        if (resAuthor.status !== 200) {
          throw new Error("author ile ilgili bir hata oluştu");
        }

        // const responseAuthor: Author[] = resPublisher.data;
        const responseAuthor: Option[] = resAuthor.data;
        const transformedAuthors = responseAuthor.map((author) => ({
          label: author.label,
          value: author.label,
          key: author.value,
        }));
        if (transformedAuthors) setAuthors(transformedAuthors);
        //#endregion

        //#region status query
        const resStatus = await getAllStatusesClient();

        if (resStatus.status !== 200)
          throw new Error("status ile ilgili bir hata oluştu");
   
        const responseStatus: Status[] = await resStatus.data;

        const transformedStatuses = responseStatus.map((status) => ({
          label: status.status_name,
          value: status.status_name,
          key: status.status_id.toString(),
        }));
        if(transformedStatuses)
        setStatuses(transformedStatuses);
        //#endregion

        //#region category query
        const resCategory = await getCategories();
        if (resCategory.status !== 200) {
          throw new Error("category ile ilgili bir hata oluştu");
        }
        const responseCategory: Category[] = await resCategory.data;

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

    fetchData();
  }, [openModal]);

  const form = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      book_image:"",
      book_title: "",
      book_summary: "",
      categories: [],
      publisher:[],
      status:[],
      author:[],
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateBookSchema>) => {
    console.log(data);
    //şu anlık kitap ekleme kapatıldı inputlar değiştirildikten sonra bu aşağıdaki bazı kodlar değiştirilecek aynı şekilde endpointte öyle
    // try {
    //   const newBook: InsertBook = {
    //     book_title: data.book_title,
    //     author_id: data.author_id,
    //     publisher_id: data.publisher_id ?? "",
    //     status_id: data.status_id,
    //     categories_id: data.categories.map((category: any) => category.key),
    //     book_summary: data.book_summary,
    //   };
    //   console.log("kitap bu ", newBook);
    //   const resInsertBook = await postInsertBookClient(newBook);
    //   if (resInsertBook.status == 201) {
    //     form.reset();
    //     toast.success(`KİTAP BAŞARIYLA EKLENDİ`, {
    //       position: "top-right",
    //       style: {
    //         backgroundColor: "hsl(143, 85%, 96%)",
    //         color: "hsl(140, 100%, 27%)",
    //         borderColor: "hsl(145, 92%, 91%)",
    //       },
    //     });
    //     eventEmitter.emit("updateGrid");
    //   } else {
    //     toast.error(`Bir hata meydana geldi`, {
    //       description: `Daha sonra tekrar deneyin!`,
    //       position: "top-right",
    //     });
    //     throw new Error("Book eklenirken bir hata oluştu");
    //   }
    // } catch (error: any) {
    //   if (error.response.data.error == "This book already exists.") {
    //     toast.error(`HATA`, {
    //       description:
    //         "Bu kitap zaten daha önceden eklenmiş lütfen yeni bir tane ekleyin",
    //       position: "top-right",
    //     });
    //   } else {
    //     toast.error(`HATA`, {
    //       description: `${error}`,
    //       position: "top-right",
    //     });
    //     console.log(`createBookError try&catch hata -> ${error}`);
    //   }
    // }
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
              {/* book image */}
              <FormField
                control={form.control}
                name="book_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kitap Resmi</FormLabel>
                    <FormControl>
                      <Input {...field} type="file" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* book name */}
              <FormField
                control={form.control}
                name="book_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kitap Adı</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* publisher  */}
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Yayınevi</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        maxSelected={1}
                        value={field.value}
                        onMaxSelected={(maxLimit) => {
                          toast.warning(`SINIR`, {
                            description: `Yalnızca ${maxLimit} adet Yayınevi seçebilirsiniz.`,
                            position: "bottom-center",
                          });
                        }}
                        ref={publisherInputRef}
                        onChange={(selectedOptions) => {
                          field.onChange(selectedOptions)
                          if (selectedOptions.length > 0)
                            publisherInputRef.current?.input.blur();
                        }}
                        defaultOptions={publishers}
                        placeholder=""
                        creatable
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Yayınevi bulunamadı.
                          </p>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* author  */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Yazar</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        maxSelected={1}
                        value={field.value}
                        onMaxSelected={(maxLimit) => {
                          toast.warning(`SINIR`, {
                            description: `Yalnızca ${maxLimit} adet Yazar seçebilirsiniz.`,
                            position: "bottom-center",
                          });
                        }}
                        ref={authorInputRef}
                        onChange={(selectedOptions) => {
                          field.onChange(selectedOptions)
                          if (selectedOptions.length > 0)
                            authorInputRef.current?.input.blur();
                        }}
                        defaultOptions={authors}
                        placeholder=""
                        creatable
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Yazar bulunamadı.
                          </p>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* status  */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Durum</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        maxSelected={1}
                        value={field.value}
                        onMaxSelected={(maxLimit) => {
                          toast.warning(`SINIR`, {
                            description: `Yalnızca ${maxLimit} adet durum seçebilirsiniz.`,
                            position: "bottom-center",
                          });
                        }}
                        ref={statusInputRef}
                        onChange={(selectedOptions) => {
                          field.onChange(selectedOptions)
                          if (selectedOptions.length > 0)
                            statusInputRef.current?.input.blur();
                        }}
                        options={statuses}
                        placeholder=""
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Durum bulunamadı.
                          </p>
                        }
                      />
                    </FormControl>
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
                        defaultOptions={categories}
                        placeholder=""
                        creatable
                        onChange={field.onChange}
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
                        style={{ minHeight: "6rem" }}
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
