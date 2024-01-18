import { LoginDto } from "@/app/_models/DTOs/loginDto";
import axios from "../axios";
import { cookies } from "next/dist/client/components/headers";
import { RegisterDto } from "@/app/_models/DTOs/registerDto";
import parse, { splitCookiesString } from "set-cookie-parser";

// Getting cookie for server side request (XmlHttpRequest)
export const getMyCookie = () => {
  try {
    const cStore = cookies();
    const cookees = cStore.get("connect.sid");
    const readable = cookees?.name + "=" + cookees?.value;
    return readable;
  } catch (error) {
    return { error: "Cookie bulunamadı!" };
  }
};

//#region All server side request (XmlHttpRequest) start

export const getLoggedInUserServer = async () => {
  const query = await fetch(`${process.env.BASE_URL}/users`, {
    headers: {
      Cookie: `${getMyCookie()}`,
    },
  });
  const response = await query.json();
  return response;
};

export const signUpServer = async (user: RegisterDto) => {
  const query = await fetch(`${process.env.BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const cookieFullString = query.headers.get("set-cookie");
  if (cookieFullString) {
    const splittedCookie = splitCookiesString(cookieFullString);
    const myCookie = parse(splittedCookie);

    cookies().set({
      name: myCookie[0].name,
      value: myCookie[0].value,
      expires: myCookie[0].expires,
      httpOnly: myCookie[0].httpOnly,
      path: myCookie[0].path,
    });
  }
  const response = await query.json();
  return response;
};

export const signInServerWithGoole = async (user: RegisterDto) => {
  const query = await fetch(`${process.env.BASE_URL}/users/login/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const cookieFullString = query.headers.get("set-cookie");
  if (cookieFullString) {
    const splittedCookie = splitCookiesString(cookieFullString);
    const myCookie = parse(splittedCookie);

    cookies().set({
      name: myCookie[0].name,
      value: myCookie[0].value,
      expires: myCookie[0].expires,
      httpOnly: myCookie[0].httpOnly,
      path: myCookie[0].path,
    });
  }
  const response = await query.json();
  return response;
};

export const logoutServer = async () => {
  const query = await fetch(`${process.env.BASE_URL}/users/logout`, {
    method: "POST",
    headers: {
      Cookie: `${getMyCookie()}`,
    },
  });
  const response = await query.status;
  return response;
};

export const postResetUserServer = async (userInputValue: string) => {
  const query = await fetch(`${process.env.BASE_URL}/users/reset`);
};

//#endregion All server side request (XmlHttpRequest) end

//#region All client side code start

export const loginClient = (user: LoginDto) => {
  return axios.post(`/users/login`, user);
};

export const logoutClient = () => {
  return axios.post(`/users/logout`);
};

export const signUpClient = (user: RegisterDto) => {
  return axios.post(`/users/signup`, user);
};

export const checkClient = (user: LoginDto) => {
  return axios.post(`/users/check`, user);
};

export const verifiedEmailClient = (token: string) => {
  return axios.post(`/users/email-verified`, {token: token});
}

//#endregion All client side code end
