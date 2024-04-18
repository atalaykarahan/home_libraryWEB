import { updateUserAuthority } from "@/app/_api/services/userService";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { EditUsersSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import EventEmitter from "events";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UserTableModel } from "../user_table/columns";

type Status = {
  value: string;
  label: string;
};

interface EditUserDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserTableModel;
}

export const updateUserAuthorityEmitter = new EventEmitter();
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
      const resStatus = await updateUserAuthority(user.user_id, data.authority);

      if (resStatus.status == 200) {
        updateUserAuthorityEmitter.emit("updateGrid");
        setIsOpen(false);
        toast.success(`GÜNCELLEME BAŞARILI`, {
          description: `${user.user_name}`,
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
        throw new Error(`updateUserAuthority error -> ${resStatus}`);
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
