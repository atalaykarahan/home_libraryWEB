import Image from "next/image";
import logo from "@/public/images/atalayLogo.png";
// import { login } from "../../../api/services/authService";
import { LoginDto } from "@/app/models/DTOs/loginDto";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

const LoginForm: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let payload: LoginDto = {
      userName: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    // try {
    //   login(payload)
    //     .then((res: any) => {
    //       if (!res.status) {
    //         throw new Error("User ile ilgili bir hata oluştu");
    //       }
    //       return res.data;
    //     })
    //     .then((response: any) => {
    //       console.log(response);
    //       return response.token;
    //     })
    //     .catch((err: any) => console.log(err));
    // } catch (error) {
    //   console.log("kullanıcı girişi ile ilgili bir sorun oluştu => " + error);
    //   return null;
    // }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Atalay Karahan"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hoş Geldin.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kullanıcı Adı
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Şifre
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Şifreni mi unuttun?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Giriş yap
              </button>

              <Button
                size="lg"
                className="mt-3 w-full justify-center rounded-m px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-s focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                variant="outline"
              >
                <FcGoogle />
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Hesabın yok mu?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Hemen bir hesap oluştur.
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
