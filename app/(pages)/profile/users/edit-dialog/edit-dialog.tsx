import {
  getMyReading,
  updateMyReadingClient,
} from "@/app/_api/services/readingService";
import { getMyStatusesClient } from "@/app/_api/services/statusService";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UserTableModel } from "../user_table/columns";
import { EditUsersSchema } from "@/schemas/user";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

type Status = {
  value: string;
  label: string;
};

interface EditUserDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserTableModel;
}

export const eventEmitter = new EventEmitter();
const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  setIsOpen,
  user,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const form = useForm<z.infer<typeof EditUsersSchema>>({
    resolver: zodResolver(EditUsersSchema),
  });

  const statuses: Status[] = [
    {
      value: "2",
      label: "Admin",
    },
    {
      value: "3",
      label: "User",
    },
    {
      value: "1",
      label: "Guest",
    },
  ];

  function StatusList({
    setOpen,
    setSelectedStatus,
  }: {
    setOpen: (open: boolean) => void;
    setSelectedStatus: (status: Status | null) => void;
  }) {
    return (
      <Command>
        <CommandInput placeholder="Ara..." />
        <CommandList>
          <CommandEmpty>Yetki bulunamadı.</CommandEmpty>
          <CommandGroup>
            {statuses.map((status) => (
              <CommandItem
                key={status.value}
                value={status.label}
                onSelect={(value) => {
                  form.setValue("authority", status.value);
                  setSelectedStatus(
                    statuses.find((st) => st.label.toLowerCase() == value) ||
                      null
                  );
                  setOpen(false);
                }}
              >
                {status.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  }
  useEffect(() => {
    setSelectedStatus(
      statuses.filter(
        (status: Status) => status.label.toLowerCase() == user.authority
      )[0]
    );
  }, []);

  const onSubmit = async (data: z.infer<typeof EditUsersSchema>) => {
    try {
      console.log(data);
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
          <DialogTitle>Kullanıcı: {user.user_name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="authority"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Yetkiler</FormLabel>
                      {isDesktop == true ? (
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-start">
                              {selectedStatus ? (
                                <>{selectedStatus.label}</>
                              ) : (
                                <>Yetki Seç</>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[200px] p-0"
                            align="start"
                          >
                            <StatusList
                              setOpen={setOpen}
                              setSelectedStatus={setSelectedStatus}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Drawer open={open} onOpenChange={setOpen}>
                          <DrawerTrigger asChild>
                            <Button variant="outline" className="justify-start">
                              {selectedStatus ? (
                                <>{selectedStatus.label}</>
                              ) : (
                                <>Yetki Seç</>
                              )}
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="mt-4 border-t">
                              <StatusList
                                setOpen={setOpen}
                                setSelectedStatus={setSelectedStatus}
                              />
                            </div>
                          </DrawerContent>
                        </Drawer>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Kaydet
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
