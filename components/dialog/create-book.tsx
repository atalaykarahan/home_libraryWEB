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
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const CreateBook: React.FC<CreateCategoryProps> = ({
  openModal,
  closeModal,
}) => {
  const [openPublisher, setOpenPublisher] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    fetchData();
    console.log("Kitap ekleme çalıştı");
  }, [openModal]);

  const fetchData = async () => {
    try {
      const res = await getAllPublisherClient();

      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }

      const response = res.data;
      setPublishers(response);
    } catch (error) {
      console.log("publisher try&catch hata -> ", error);
    }
  };

  const form = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      book_title: "",
      author_id: 0,
      publisher_id: 0,
      status_id: 0,
      book_summary: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateBookSchema>) => {
    console.log(values);
  };
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
            <FormSuccess message={successMessage} /> */}
            <Button type="submit" className="w-full">
              Oluştur
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBook;
