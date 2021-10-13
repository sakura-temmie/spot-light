import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layoutParts/LayoutNotLogin";
import Logo from "../../public/spotlightLogo1.png";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [truePassword, setTruePassword] = useState("");

  const regex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  const isTrueEmail = regex.test(email);
  const isTruePassword = password === truePassword;
  const isTrueRegister =
    isTrueEmail == true &&
    isTruePassword == true &&
    !(password == null || password == "");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}register`, {
        method: "POST",
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          role: "10",
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 400) {
          throw "新規登録が失敗しました";
        } else if (res.ok) {
          return res.json();
        }
      });
      router.push("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Layout title="劇場新規登録">
      <div className="max-w-md w-full space-y-8 bg-white rounded p-10">
        <div className="flex flex-col items-center">
          <Image src={Logo} alt="Logo" width="150" height="100" />
          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray">
            新規登録
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            アカウントをお持ちの場合は　
            <Link href="/login">
              <a
                href=""
                className="font-medium text-yellow-400 hover:text-yellow-500"
              >
                ログイン
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={createUser}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="shadow-sm -space-y-px">
            <div>
              <p>劇場名</p>
              <input
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="劇場名"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="pt-4">
              <p>メールアドレス</p>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="pt-4">
              <p>パスワード</p>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="pt-4">
              <p>パスワード（確認）</p>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="パスワード（確認）"
                value={truePassword}
                onChange={(e) => {
                  setTruePassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            {isTrueRegister ? (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                新規作成
              </button>
            ) : (
              <div>
                <span className="text-xs pl-2 text-red-400">
                  入力されている情報が正しくありません
                </span>
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 cursor-not-allowed">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  新規作成
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}
