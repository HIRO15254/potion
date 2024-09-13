import {headers} from "next/headers";
import {redirect} from "next/navigation";

import {auth} from "~/server/auth";

/**
 * [Server-side]
 *
 * ページアクセス権限を管理するスクリプト。
 * 権限がない場合、適切なページにリダイレクトさせる等の処理を行う。
 */
export const protectPage = async () => {
  await auth().then((session) => {
    if (!session?.user) {
      redirect(`/login?callbackUrl=${headers().get("x-url") ?? "/"}`);
    }
  })
}
