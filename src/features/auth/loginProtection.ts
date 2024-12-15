import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

/**
 * @description
 * 未ログイン状態でのアクセスを禁止する
 * (Server Component用)
 */
export const loginProtection = async () => {
  const session = await auth();
  if (session?.user == null) {
    redirect("/api/auth/signin");
  } else {
    return session;
  }
};
