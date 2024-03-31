import {
  getMyReading,
  updateMyReadingClient,
} from "@/app/_api/services/readingService";
import { getMyStatusesClient } from "@/app/_api/services/statusService";
import { Status } from "@/app/_models/status";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EditMyReadingSchema } from "@/schemas/reading";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import EventEmitter from "events";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { MyBookTableModel } from "../my_book_table/columns";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface EditMyBookDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  book: MyBookTableModel;
}

export const eventEmitter = new EventEmitter();
const EditMyBookDialog: React.FC<EditMyBookDialogProps> = ({
  isOpen,
  setIsOpen,
  book,
}) => {
  const [statusPopover, setStatusPopover] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    console.log(book);
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    //#region Get statuses for select box
    const resStatus = await getMyStatusesClient();
    if (resStatus.status !== 200) {
      throw new Error("Statuses ile ilgili bir hata oluştu");
    }
    setStatuses(resStatus.data);
    //#endregion

    //#region reading info
    const resReading = await getMyReading(book.reading_id);
    if (resReading.status !== 200) {
      throw new Error("Reading ile ilgili bir hata oluştu");
    }
    if (resReading.data.comment)
      form.setValue("comment", resReading.data.comment);

    //#endregion
  };

  const form = useForm<z.infer<typeof EditMyReadingSchema>>({
    resolver: zodResolver(EditMyReadingSchema),
  });

  const onSubmit = async (data: z.infer<typeof EditMyReadingSchema>) => {
    try {
      const resStatus = await updateMyReadingClient(
        book.reading_id,
        data.status_id,
        data.comment
      );
      if (resStatus.status === 200) {
        //this is for update grid
        eventEmitter.emit("updateGrid");

        setIsOpen(false);
        toast.success(`GÜNCELLEME BAŞARILI`, {
          description: `${book.book_title}`,
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
        throw new Error(`updateMyReading error -> ${resStatus}`);
      }
    } catch (error) {
      toast.error(`HATA`, {
        description: `${error}`,
        position: "top-right",
      });
      throw new Error(`addMyReading try&catch hata -> ${error}`);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kitap: {book.book_title}</DialogTitle>
          <DialogDescription>Yazar: {book.author}</DialogDescription>
          <div style={{ maxWidth: "110px", maxHeight: "310px" }}>
            <AspectRatio ratio={220 / 310} className="bg-muted">
              <Image
                src={
                  book.book_image ??
                  "https://img.freepik.com/premium-vector/manual-book-with-instructions-vector-icon_116137-9345.jpg"
                }
                alt={book.book_title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="status_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Durum</FormLabel>
                      <Popover
                        open={statusPopover}
                        onOpenChange={setStatusPopover}
                      >
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
                                : book.status}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          style={{
                            maxHeight: "15rem",
                            overflow: "auto",
                          }}
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
                                    setStatusPopover(false);
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
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notlarım</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Notların..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Kaydet
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditMyBookDialog;
