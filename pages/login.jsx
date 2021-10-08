import { useState } from "react";
import { useRouter } from "next/router";
// import Cookie from "universal-cookie";
import Layout from "../components/layoutParts/LayoutNotLogin";
import Logo from "../public/icon.png";
import Image from "next/image";
import Link from "next/link";

//クッキーのインスタンスを作る
// const cookie = new Cookie();

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw "認証が失敗しました";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          localStorage.setItem("access_token", data.token);
        });
      router.push("/top");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Layout>
      <div className="max-w-md w-full space-y-8 bg-white rounded p-10">
        <div className="flex flex-col items-center">
          <Image src={Logo} alt="Logo" width="100" height="100" />
          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray">
            ログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            アカウントをお持ちですか？　
            <Link href="/" passHref>
              <a
                href=""
                className="font-medium text-yellow-400 hover:text-yellow-500"
              >
                新規登録
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={login}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
