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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PublisherComboBox from "../ui/combobox/publisher-box";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const CreateBook: React.FC<CreateCategoryProps> = ({
  openModal,
  closeModal,
}) => {
  // const handleCloseModal = () => {
  //   openModal = false;
  // };

  const form = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      book_title: "",
      author_name: "",
      publisher_name: "",
      status: "",
      book_summary: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateBookSchema>) => {
    console.log(values);
    // const serverProps: RegisterDto = {
    //   user_name: values.nick_name,
    //   email: values.email,
    //   password: values.password,
    // };

    // startTransition(() => {
    //   try {
    //     console.log(serverProps);
    //     signUpClient(serverProps)
    //       .then((res: any) => {
    //         if (!res.status) {
    //           throw new Error("User ile ilgili bir hata oluştu");
    //         }
    //         return res.data;
    //       })
    //       .then((response: any) => {
    //         if (response.message === "mail sent") {
    //           setSuccessMessage("Doğrulama maili gönderildi.");
    //         }
    //         console.log(response);
    //       })
    //       .catch((err: any) => {
    //         if (err.response.status) {
    //           setErrorMessage("Geçersiz kullanıcı bilgileri");
    //         }
    //         console.log(err);
    //       });
    //   } catch (error) {
    //     console.log("kullanıcı ile ilgili bir sorun oluştu ", error);
    //   }
    // });
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
                name="publisher_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yayınevi</FormLabel>
                    <FormControl>
                      {/* <Input {...field} type="text" /> */}
                      <PublisherComboBox/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
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

        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateBook;
