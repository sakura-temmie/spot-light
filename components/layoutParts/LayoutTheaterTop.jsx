import { useState, useEffect } from "react";
import LayoutTheaterTopSideBar from "./LayoutTheaterTopSideBar";
import LayoutTheaterTopCardArea from "./LayoutTheaterTopCardArea";
import LayoutTheater from "../../components/layoutParts/LayoutTheater";

//演出家トップページにコンテンツ
export default function LayoutTheaterTop() {
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
      // const accessToken = await new Cookie().get("access_token")
      const accessToken = await localStorage.getItem("access_token");
      const path = "directors";
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
          console.log(data.data);
          localStorage.setItem("test", JSON.stringify(data));
          setProfileData(data.data);
        });
      } catch (err) {
        alert(err);
      }
    };

    //検索後に取得するプロフィール
  const getProfile2 = async (
    minMoney,
    maxMoney,
    minCapacity,
    maxCapacity,
    areaNum,
    date
  ) => {
      const freeSchedule = String(date);
      const lowerLimitPrice = String(minMoney);
      const upperLimitPrice = String(maxMoney);
      const lowerLimitCapacity = String(minCapacity);
      const upperLimitCapacity = String(maxCapacity);

      //クッキーの取得
      // const accessToken = await new Cookie().get("access_token")
      const accessToken = await localStorage.getItem("access_token");
      // await setAccessToken(new Cookie().get("access_token"))
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}directors/search`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: accessToken,
            free_schedule: freeSchedule,
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
          localStorage.setItem("test", JSON.stringify(data));
          setProfileData(data.data);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  return (
    <LayoutTheater title="Top">
      <div className="flex mt-3 w-full">
        <LayoutTheaterTopSideBar action={getProfile2} />
        <LayoutTheaterTopCardArea
          directorApi={profileData}
          // path="/theater/profile"
        />
      </div>
    </LayoutTheater>
  );
}
