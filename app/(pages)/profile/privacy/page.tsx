"use client";
import { patchUpdateVisibility } from "@/app/_api/services/userService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserProfilePrivacySchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

const UserPrivacy = () => {
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof UserProfilePrivacySchema>>({
    resolver: zodResolver(UserProfilePrivacySchema),
    defaultValues: {
      user_visibility: user?.user_visibility,
      user_library_visibility: user?.user_library_visibility,
    },
  });

  const onSubmit = async (data: z.infer<typeof UserProfilePrivacySchema>) => {
    console.log(data);

    try {
      const resStatus = await patchUpdateVisibility(
        data.user_visibility,
        data.user_library_visibility
      );
      if (resStatus.status == 200) {
        toast.success(`GÜNCELLEME BAŞARILI`, {
          description: "Gizlilik ayarlarınız güncellendi",
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
        throw new Error(`update visibility error -> ${resStatus}`);
      }
    } catch (error) {
      toast.error(`HATA`, {
        description: `${error}`,
        position: "top-right",
      });
      throw new Error(`update visibility try&catch hata -> ${error}`);
    }
  };

  return (
    <>
      {user?.role == 1 && (
        <Alert variant="destructive">
          <IoAlertCircleOutline className="h-4 w-4" />
          <AlertTitle>Geçersiz Yetki</AlertTitle>
          <AlertDescription>
            Yetkiniz gizlilik ayarlarınızı güncellemenize izin vermiyor. Lütfen
            yöneticinizden yetkinizi yükseltmeyi talep edin.
          </AlertDescription>
        </Alert>
      )}

      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Gizlilik Ayarları</CardTitle>
          <CardDescription>
            Kendini komple gizli yapabilir veya dilersen sadece okuduğun
            kitapların (Üyeler kısmından) gizli kalmasını sağlayabilirsin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="user_visibility"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Profili Gizle
                          </FormLabel>
                          <FormDescription>
                            Profilini gizlersen kütüphanen dahil tamamen
                            görünmez olursun hesabın hiç var olmamış gibi.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            disabled={user?.role == 1}
                            onCheckedChange={(value) => {
                              if (value)
                                form.setValue("user_library_visibility", true);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="user_library_visibility"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Kütüphaneyi Gizle
                          </FormLabel>
                          <FormDescription>
                            Kütüphaneni gizlersen kaç kitap okuyup kaç tanesini
                            yarım bıraktığın gözükür ancak bunların hangi
                            kitaplar olduğu gözükmez.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={form.getValues("user_visibility")}
                            aria-readonly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button disabled={user?.role == 1} type="submit">
                Kaydet
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default UserPrivacy;
