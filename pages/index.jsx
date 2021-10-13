import Link from "next/link";
import Image from "next/image";
import topImage from "../public/topImage.jpg";
import Head from "next/head";
import Logo from "../public/spotlightLogo2.png";
import cssClass from "./index.module.css";

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
        <div className="flex my-10">
          <p className="text-4xl">S</p>
          <p className="text-4xl ml-12">p</p>
          <p className="text-4xl ml-12">o</p>
          <p className="text-4xl ml-12">t</p>
          <p className="text-4xl ml-12">L</p>
          <p className="text-4xl ml-12">i</p>
          <p className="text-4xl ml-12">g</p>
          <p className="text-4xl ml-12">h</p>
          <p className="text-4xl ml-12">t</p>
        </div>
        <div className="font-serif tracking-widest ">
          <p className="text-gray-700 text-opacity-75">
            作品をもっと作りやすく
          </p>
          <p className="mt-4 text-gray-700 text-opacity-75">
            エンターテイメントは終わらない
          </p>
        </div>
        <div className="my-12">
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
          <div className="font-serif">
            <div className="rounded-full h-40 w-40 flex items-center border-yellow-300 justify-center border border-orange-400">
              POINT 01
            </div>
            <div className="rounded-full h-40 w-40 flex items-center border-yellow-300 mt-4 justify-center border border-orange-400">
              POINT 02
            </div>
            <div className="rounded-full h-40 w-40 flex items-center border-yellow-300 mt-4 justify-center border border-orange-400">
              POINT 03
            </div>
            <div className="rounded-full h-40 w-40 flex items-center mt-4 border-yellow-300 justify-center border border-orange-400">
              POINT 04
            </div>
            <div className="rounded-full h-40 w-40 flex items-center mt-4 border-yellow-300 justify-center border border-orange-400">
              POINT 05
            </div>
          </div>
        </div>
        <div className="w-64">
          <Link href="/login" passHref>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              ログイン
            </button>
          </Link>
          <Link href="/register/theater" passHref>
            <button
              type="submit"
              className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              劇場関係者の方
            </button>
          </Link>
          <Link href="/register/director" passHref>
            <button
              type="submit"
              className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              演出家の方
            </button>
          </Link>
        </div>
      </main>
      <footer className="bg-white">
        <p className="p-5 pb-10 text-center text-xs">
          Copyright © 2021 LAB 11, inc. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
