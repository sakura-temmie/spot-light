//演出家トップのコンテンツエリアに配置するカード
//imgUrl        => 劇場のトップ画像のパスを取得
//theaterName   => 劇場名を取得
//maxCapacity   => 劇場のキャパシティ
//usageAmount   => １週間の利用料金
//area          => 劇場の所在地があるエリア
import Link from "next/link";
import Image from "next/image";
import cssClass from "./Layout.module.css";
import { useRouter } from "next/router";

export default function LayoutDirectorTopCard({
  id,
  imgUrl,
  name,
  totalNumberPerformances,
  currentPerformance,
  path,
}) {
  const router = useRouter();

  //カードをクリックした後、遷移先にIDを渡す
  const passUserId = () => {
    router.push({
      pathname: "director/profile",
      query: {id: id},
    })
  }

  return (
    // <Link href={path} passHref>
      <div className="w-full cursor-pointer" onClick={passUserId}>
        <div className={cssClass.img_wrap}>
        <div className="mx-3 mb-20 bg-white">
            <Image
              src={imgUrl}
              alt=""
              height="400"
              width="600"
              objectFit="cover"
              />
            <div className="bg-white py-2 px-6">
              <p className="text-xl my-4"> {name} </p>
              {/* <div className="flex mt-8"> */}
              <div className="flex pl-2">
                <p className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2 ">
                  通算公演数
                </p>
                <p className="pt-1 text-sm font-thin">
                  {totalNumberPerformances} 公演
                </p>
              </div>
              <div className="flex pl-2">
                <p className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2 ">
                  最近の公演
                </p>
                <p className="pt-1 text-sm font-thin">{currentPerformance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </Link>
  );
}
