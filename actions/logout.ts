"use server";

import { logoutServer } from "@/app/_api/services/authService";
import { signOut } from "@/auth";
import { cookies } from "next/dist/client/components/headers";

export const logout = async () => {
  /*if you wanna do some server stuff you can using 
    like this logout method */
  cookies().delete("connect.sid");
  await signOut();
};

export const logoutTogether = async () => {
  await logoutServer().then(async (res: any) => {
    if (res === 200) {
      cookies().delete("connect.sid");
      await signOut();
    }
  });
};

// DONT DELETE THIS
// you can paste if you want to use settings page to server side
// import { auth, signOut } from "@/auth";

// const SettingsPage = async () => {
//   const session = await auth();

//   return (
//     <div>
//       {JSON.stringify(session)}

//       <form
//         action={async () => {
//           "use server";

//           await signOut();
//         }}
//       >
//         <button type="submit">sign out</button>
//       </form>
//     </div>
//   );
// };

// export default SettingsPage;
