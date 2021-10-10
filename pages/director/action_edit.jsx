import LayoutSideBarSearchBox from "../../components/layoutParts/LayoutSideBarSearchBox";
import Layout from "../../components/layoutParts/Layout";
import ProfileHeading from "../../components/profileParts/ProfileHeading";
import { useState } from "react";
import { useRouter } from "next/router";

const Action_edit = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [times, setTimes] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [customerAttractionRate, setCustomerAttractionRate] = useState("");
  const [casts, setCasts] = useState("");

  const updateEdit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await localStorage.getItem("access_token");
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}me/director/performance`,
        {
          method: "POST",
          body: JSON.stringify({
            token: accessToken,
            name: name,
            contents: contents,
            start_date: startDate,
            end_date: endDate,
            times: times,
            theater_name: theaterName,
            customer_attraction_rate: customerAttractionRate,
            casts: casts,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 400) {
            throw "認証が失敗しました";
          } else if (res.ok) {
            return res.json();
          }
        })
      router.push("/top");
    } catch (err) {
      alert(err);
    }
  };


  return (
    <Layout title={"演出家公演編集"}>
      <div style={{ width: "960px" }}>
        <ProfileHeading title={"過去の実績"} />
        <form onSubmit={updateEdit}>
          <div className="flex">
            <p className="w-1/4 m-3 p-2 border text-center text-base">公演名</p>
            <input
              className="w-3/4 m-3 p-2 border"
              type="text"
              placeholder={"公演名を入力してください"}
              defaultValue={""}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex">
            <p className="w-1/4 m-3 p-2 border text-center text-base">
              公演内容
            </p>
            <textarea
              className="w-3/4 m-3 p-2 border text-base"
              type="text"
              placeholder={"公演内容を入力してください"}
              defaultValue={""}
              onChange={(e) => {
                setContents(e.target.value);
              }}
            />
          </div>
          <div className="flex">
            <p className="w-1/4 m-3 p-2 border text-center text-base">劇場名</p>
            <input
              className="w-3/4 m-3 p-2 border text-base"
              type="text"
              placeholder={"劇場名を入力してください"}
              defaultValue={""}
              onChange={(e) => {
                setTheaterName(e.target.value);
              }}
            />
          </div>
              <div className="flex">
                <p className="w-1/4 m-3 p-2 border text-center text-base">
                  公演数
                </p>
                <input
                  className="w-3/4 m-3 p-2 border"
                  type="text"
                  placeholder={"半角数字でご入力ください"}
                  defaultValue={""}
                  onChange={(e) => {
                    setTimes(e.target.value);
                  }}
                />
              </div>
              <div className="flex">
                <p className="w-1/4 m-3 p-2 border text-center text-base">
                  集客率
                </p>
                <input
                  className="w-3/4 m-3 p-2 border"
                  type="text"
                  placeholder={"半角数字でご入力ください"}
                  defaultValue={""}
                  onChange={(e) => {
                    setCustomerAttractionRate(e.target.value);
                  }}
                />
              </div>
          <div className="flex">
            <p className="w-1/4 m-3 p-2 border text-center text-base">日程</p>
            <div className="w-3/4 m-3 p-2 bg-white">
              <LayoutSideBarSearchBox
                // title="日程"
                inputType="date"
                name1="startDate"
                subTitle1="開始日"
                name2="endDate"
                subTitle2="終了日"
                unit=""
                action1={setStartDate}
                action2={setEndDate}
              />
            </div>
          </div>
          <div className="flex">
            <p className="w-1/4 m-3 p-2 border text-center text-base">
              出演キャスト
            </p>
            <textarea
              className="w-3/4 m-3 p-2 border text-base"
              type="text"
              placeholder={"キャストを入力してください"}
              defaultValue={""}
              onChange={(e) => {
                setCasts(e.target.value);
              }}
            />
          </div>
          <div className="justify-center">
            <button
              type="submit"
              className="group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 m-auto mt-6"
            >
              保存する
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Action_edit;
