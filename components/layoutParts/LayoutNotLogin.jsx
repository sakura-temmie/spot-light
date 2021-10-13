import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import banner from "../../public/spotlightLogo1.png";

//childrenはインポート先でラップしてる全てのコンテンツが入ってくる
//titleはLayoutが呼び出された時にページから特定のタイトルを受け取る
export default function Layout({ children, title }) {
;
  return (
    <div className="flex flex-col text-gray-600 text-sm font-sans min-h-screen">
      <Head>
        {/* プロップスで渡された値を動的に受け取る */}
        <title>{title}</title>
      </Head>
      <header className="sticky top-0 z-10 bg-gray-100 w-screen border-b border-gray-200 items-center text-center justify-center h-24">
        <nav>
          <div className="flex items-center h-24 items-center text-center justify-center">
            {/* <div className="container flex items-center"> */}
            <Link href="/" passHref>
            <Image src={banner} alt="main Image" width={150} height={100} />
            </Link>
            <div className="ml-auto flex ">
              {/* <LayoutButton path="/top" title="演出家を探す" /> */}
              {/* <LayoutButton path="/chat" title="メッセージ" /> */}
              {/* <LayoutButton path="/director/profile" title="プロフィール" /> */}
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col flex-grow items-center bg-gray-100 py-20 px-3">
        {children}
      </main>
      <footer className="bg-white">
        <p className="p-5 pb-10 text-center text-xs">
          Copyright © 2021 LAB 11, inc. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
