"use client";
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
import { UserProfilePrivacySchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserPrivacy = () => {
  const form = useForm<z.infer<typeof UserProfilePrivacySchema>>({
    resolver: zodResolver(UserProfilePrivacySchema),
    defaultValues: {
      user_visibility: true,
      user_library_visibility: true,
    },
  });

  function onSubmit(data: z.infer<typeof UserProfilePrivacySchema>) {
    console.log(data);
  }

  return (
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
                          Profilini gizlersen kütüphanen dahil tamamen görünmez
                          olursun hesabın hiç var olmamış gibi.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
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
                          yarım bıraktığın gözükür ancak bunların hangi kitaplar
                          olduğu gözükmez.
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
            <Button type="submit">Kaydet</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserPrivacy;
