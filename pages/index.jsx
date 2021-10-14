import Link from "next/link";
import Image from "next/image";
import topImage from "../public/topImage.jpg";
import Head from "next/head";
import Logo from "../public/spotlightLogo2.png";
import BottomImg from "../public/bottomImg.png";
import cssClass from "./index.module.css";
import PointSentence from "../components/topParts/PointSentence";
import Title from "../components/topParts/Title";

export default function Index() {
  return (
    <>
      <Head>
        <title>Spot-Light</title>
      </Head>
      <main className="flex flex-col flex-grow items-center pb-20 bg-gray-100">
        <div className="relative">
          <Image src={topImage} alt="topImage" />
        </div>
        <div className="absolute top-80 left-50 text-white">
          <p className="font-serif tracking-widest text-4xl">
            舞台を愛するすべての人たちへ
          </p>
        </div>
        <div className="absolute right-10">
          <Image src={Logo} alt="logo" width={300} height={200} />
        </div>
        <Title />
        <div className="flex flex-col font-serif tracking-widest items-center">
          <p className="text-gray-700 text-opacity-75">
            作品をもっと作りやすく
          </p>
          <p className="mt-4 text-gray-700 text-opacity-75">
            エンターテイメントは終わらない
          </p>
        </div>
        <div className="my-24">
          <div className="flex justify-center my-8">
            <p className="border-b text-xl px-4 pb-1 border-gray-400 text-gray-600">
              利用シーン
            </p>
          </div>
          <div className="flex font-serif">
            <div className="rounded-full h-40 w-40 flex items-center border-yellow-300 justify-center border border-orange-400">
              舞台演劇
            </div>
            <div className="rounded-full h-40 w-40 flex items-center border-yellow-300 ml-6 justify-center border border-orange-400">
              ダンス公演
            </div>
            <div className="rounded-full h-40 w-40 flex items-center border-yellow-300 ml-6 justify-center border border-orange-400">
              ショーケース
            </div>
            <div className="rounded-full h-40 w-40 flex items-center ml-6 border-yellow-300 justify-center border border-orange-400">
              発表会
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center py-24">
          <div className="flex justify-center">
            <p className="border-b text-xl px-4 pb-1 mb-8 border-gray-400 text-gray-600">
              できること
            </p>
          </div>
          <div className="">
            <PointSentence
              nom="01"
              top="絞り込み検索"
              text1="エリアを絞って劇場の検索ができる。"
              text2="希望のエリアから劇場が探せます。"
            />
            <PointSentence
              nom="02"
              top="劇場の一括管理"
              text1="劇場の数が多すぎて"
              text2="調べるのが大変という悩みを解決します。"
            />
            <PointSentence
              nom="03"
              top="料金表示"
              text1="各劇場の利用料を"
              text2="１週間単位で表示します。"
            />
            <PointSentence
              nom="04"
              top="チャット機能"
              text1="チャットを使って簡単に"
              text2="お問合せすることができます。"
            />
            <PointSentence
              nom="05"
              top="演出家を検索"
              text1="自分の劇場に空きがあり埋めたい場合"
              text2="舞台を探している演出家を調べることができます。"
            />
          </div>
        </div>
        <Image src={BottomImg} alt="bottomImage" />
        <div className="font-serif tracking-widest text-2xl mb-12">
          ご利用はこちら
        </div>
        <div className="flex">
          <div className="mt-14">
            <Link href="/login" passHref>
              <button
                type="submit"
                className="py-2 px-14 text-sm font-medium text-yellow-400 bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                ログイン
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center ml-24">
            <div className="font-serif tracking-widest text-3xs mb-2">
              新規登録
            </div>
            <Link href="/register/theater" passHref>
              <button
                type="submit"
                className="py-2 px-9 text-sm font-medium text-yellow-400 bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                劇場関係者の方
              </button>
            </Link>
            <Link href="/register/director" passHref>
              <button
                type="submit"
                className="mt-5 py-2 px-12 text-sm font-medium text-yellow-400 bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                演出家 の方
              </button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-white">
        <p className="pt-5 text-center text-2xs">
          Contact : spotlight@gmail.com
        </p>
        <p className="pt-2 text-center text-2xs">
          Instagram : @spotlight.official
        </p>
        <p className="p-5 pb-10 text-center text-xs">
          Copyright © 2021 LAB 11, inc. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
