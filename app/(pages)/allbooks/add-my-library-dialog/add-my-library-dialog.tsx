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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { cn } from "@/lib/utils";
import { BookTableModel } from "../book_table/columns";
import { AddMyLibrarySchema } from "@/schemas/reading";
import { z } from "zod";
import { getMyStatusesClient } from "@/app/_api/services/statusService";
import { useEffect, useState } from "react";
import { Status } from "@/app/_models/status";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMyLibraryClient } from "@/app/_api/services/readingService";
import { toast } from "sonner";
import EventEmitter from "events";

export const addMyLibraryEmitter = new EventEmitter();

interface AddMyLibraryDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  book: BookTableModel;
}

const AddMyLibraryDialog: React.FC<AddMyLibraryDialogProps> = ({
  isOpen,
  setIsOpen,
  book,
}) => {
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resStatus = await getMyStatusesClient();

    if (resStatus.status !== 200) {
      throw new Error("author ile ilgili bir hata oluştu");
    }

    //if someone already using this book we should not add it to reading library again
    if (book.status == "Okunuyor") {
      resStatus.data = resStatus.data.filter((s: any) => s.status_id !== "1");
    }

    setStatuses(resStatus.data);
  };

  const form = useForm<z.infer<typeof AddMyLibrarySchema>>({
    resolver: zodResolver(AddMyLibrarySchema),
  });

  const onSubmit = async (data: z.infer<typeof AddMyLibrarySchema>) => {
    try {
      const res = await addMyLibraryClient(
        book.book_id,
        parseInt(data.status_id)
      );
      if (res.status !== 201) {
        toast.error(`Bir hata meydana geldi`, {
          description: `Daha sonra tekrar deneyin!`,
          position: "top-right",
        });
        throw new Error("addMyLibrary ile ilgili bir hata oluştu");
      } else {
        addMyLibraryEmitter.emit("updateGrid");
        setIsOpen(false);
        toast.success(`KİTAP KÜTÜPHANENE EKLENDİ`, {
          description: `${book.book_title}`,
          position: "top-right",
          style: {
            backgroundColor: "hsl(143, 85%, 96%)",
            color: "hsl(140, 100%, 27%)",
            borderColor: "hsl(145, 92%, 91%)",
          },
        });
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
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book.book_title}</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
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

                <Button type="submit" className="w-full">
                  Oluştur
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddMyLibraryDialog;
