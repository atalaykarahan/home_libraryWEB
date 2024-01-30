"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { verifiedEmailClient } from "@/app/_api/services/authService";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }

    try {
      verifiedEmailClient(token)
        .then((res: any) => {
          if (res.status !== 201) {
            throw new Error("Something went wrong!");
          }
          return res.data;
        })
        .then((response: any) => {
          if (response.message) {
            setSuccess("Hesabınız başarıyla onaylandı");
          }
        })
        .catch((err: any) => {
          console.log("axios catch section ", err);
          if (
            err.response &&
            err.response.data.error ===
              "Your token has been expired. Please try again verification process."
          ) {
            setError("Token süresi dolmuş yeniden onay maili isteyin!");
          } else {
            setError("Bir şeyler ters gitti yeniden deneyin!");
          }
        });
    } catch (error) {
      console.log("tru & catch section ", error);
      setError("Bir şeyler ters gitti yeniden deneyin!");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Hesabımı onayla"
      backButtonHref="/login"
      backButtonLabel="Giriş yap"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
