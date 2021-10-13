import { useState, useEffect } from "react";
import LayoutDirectorTopSideBar from "./LayoutDirectorTopSideBar";
import LayoutDirectorTopCardArea from "./LayoutDirectorTopCardArea";
import Layout from "../../components/layoutParts/Layout"

//演出家トップページにコンテンツ
export default function LayoutDirectorTop() {
  const [profileData, setProfileData] = useState([]);

  //初回のみ実行
  useEffect(() => {
    getProfile();
  }, []);

  //劇場または演出家のプロフィール一覧を取得
  const getProfile = async () => {
    //クッキーの取得
    try {
      //クッキーの取得
      // const accessToken = await new Cookie().get("access_token");
      const accessToken = await localStorage.getItem("access_token");

      const path = "theaters";
      await fetch(process.env.NEXT_PUBLIC_RESTAPI_URL + path, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProfileData(data.data);
          localStorage.setItem("test", JSON.stringify(data.data));
        });
    } catch (err) {
      alert(err);
    }
  };

  //検索バー用のプロフィールデータの取得
  //クッキーの認証トークンを取得後、ページをセット
  const getProfile2 = async (
    minMoney,
    maxMoney,
    minCapacity,
    maxCapacity,
    areaNum,
    date
  ) => {
    const freeSchedule = String(date);
    const area = String(areaNum);
    const lowerLimitPrice = String(minMoney);
    const upperLimitPrice = String(maxMoney);
    const lowerLimitCapacity = String(minCapacity);
    const upperLimitCapacity = String(maxCapacity);

    //クッキーの取得
    // const accessToken = await new Cookie().get("access_token");
    const accessToken = await localStorage.getItem("access_token");

    // await setAccessToken(new Cookie().get("access_token"))
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}theaters/search`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
          free_schedule: freeSchedule,
          area: area,
          lower_limit_price: lowerLimitPrice,
          upper_limit_price: upperLimitPrice,
          lower_limit_capacity: lowerLimitCapacity,
          upper_limit_capacity: upperLimitCapacity,
        }),
      })
        .then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setProfileData(data.data);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  {
    /*  サイドバーのエリア名を表示するためのダミーデータ  */
  }
  const area = [
    "",
    "銀座・有楽町・築地",
    "新橋・浜松町・田町",
    "赤坂・六本木・麻布",
    "飯田橋・四ツ谷・神楽坂",
    "新宿・代々木",
    "大久保・高田馬場",
    "渋谷・原宿・青山",
    "池袋・巣鴨・駒込",
    "東京・丸の内・日本橋",
    "上野・浅草・日暮里",
    "神田・秋葉原・水道橋",
    "品川・五反田・大崎",
    "お台場・豊洲・湾岸",
    "恵比寿・中目黒・目黒",
    "自由が丘・三軒茶屋・二子玉川",
    "下北沢・明大前・成城学園前",
    "中野・高円寺・荻窪",
    "吉祥寺・三鷹",
    "練馬・江古田・田無",
    "人形町・門前仲町・葛西",
    "錦糸町・押上・新小岩",
    "北千住・綾瀬・亀有",
    "板橋・成増・赤羽",
    "大井町・大森・蒲田",
    "府中・調布",
    "大井町・大森・蒲田",
    "町田・多摩",
    "小金井・国分寺・国立",
    "立川・八王子・青梅",
    "横浜・東神奈川",
    "溝の口・たまプラーザ・青",
    "みなとみらい・関内・中華",
    "川崎・鶴見",
    "武蔵小杉・日吉・綱島",
    "新横浜・センター南・鴨居",
    "上大岡・金沢文庫・新杉田",
    "横須賀・久里浜・三浦半島",
    "戸塚・東戸塚",
    "鎌倉・大船・逗子",
    "藤沢・茅ヶ崎・平塚",
    "登戸・向ヶ丘遊園・新百合",
    "大和・中央林間・二俣川",
    "相模大野・橋本・相模湖",
    "本厚木・海老名",
    "伊勢原・秦野・渋沢",
    "小田原・箱根・湯河原",
    "朝霞・川越・坂戸",
    "所沢・入間・狭山",
    "大宮・さいたま新都心",
    "浦和",
    "川口・蕨・戸田",
    "越谷・草加・春日部",
    "秩父・長瀞・飯能",
    "上尾・熊谷・久喜",
    "柏・松戸・我孫子",
    "成田・八千代・佐倉",
    "内房・外房・銚子",
    "千葉・幕張",
    "市川・船橋・津田沼",
    "舞浜・浦安・行徳",
  ];

  return (
    <Layout title="top">
      <div className="flex mt-3 w-full">
        <LayoutDirectorTopSideBar areaApi={area} action={getProfile2} />
        <LayoutDirectorTopCardArea
          theaterApi={profileData}
          path="/director/profile"
        />
      </div>
    </Layout>
  );
}
