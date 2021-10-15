//演出家トップのコンテンツエリアに配置するカード
//imgUrl        => 劇場のトップ画像のパスを取得
//theaterName   => 劇場名を取得
//maxCapacity   => 劇場のキャパシティ
//usageAmount   => １週間の利用料金
//area          => 劇場の所在地があるエリア
// import Link from "next/link";
import Image from "next/image";
import cssClass from "./Layout.module.css";
import { useRouter } from "next/router";

export default function LayoutDirectorTopCard({
  id,
  imgUrl,
  theaterName,
  maxCapacity,
  usageAmount,
  area,
  path,
})
{
  const router = useRouter();
  //カードをクリックした後、遷移先にIDを渡す
  const passUserId = () => {
    router.push({
      pathname: "theater/profile",
      query: { id: id },
    });
  };

  return (
    // <Link href={path} passHref>
      <div className="w-full cursor-pointer" onClick={passUserId}>
        <div className={cssClass.img_wrap}>
          <div className="mx-3 bg-white mb-20">
            <Image
              className="w-72 h-48 object-fit mb-2"
              src={imgUrl}
              alt=""
              height="400"
              width="600"
              objectFit="cover"
            />
            <div className="bg-white py-2 px-6">
              <p className="text-xl my-4"> {theaterName} </p>
              <div className="px-2 pb-2">
                <div className="flex pl-2">
                  <p className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2 ">
                    最大収容人数
                  </p>
                  <p className="pt-1 text-sm font-thin">{maxCapacity} 人</p>
                </div>
                <div className="flex pl-2">
                  <p className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2 ">
                    希望利用額（１週間）
                  </p>
                  <p className="pt-1 text-sm font-thin"> {usageAmount} 万円</p>
                </div>
                <div className="flex pl-2">
                  <p className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2 ">
                    エリア
                  </p>
                  <p className="pt-1 text-sm font-thin">{area}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </Link>
  );
}
