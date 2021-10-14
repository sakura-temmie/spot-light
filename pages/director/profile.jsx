import Layout from "../../components/layoutParts/LayoutTheater";
import ProfileTopParts from "../../components/profileParts/ProfileTopParts";
import ProfileMiddleParts from "../../components/profileParts/ProfileMiddleParts";
import ProfileResultsArea from "../../components/profileParts/ProfileResultsArea";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import noImage from "../../public/imgPlaceholder.png";

const Profile = () => {
  const [directorData, setDirectorData] = useState([]);
  const [directorDetail, setDirectorDetail] = useState([]);
  const [directorPerformance, setDirectorPerformance] = useState([]);

  const router = useRouter();
  const pId = router.query.id;
  // //初回のみ実行
  useEffect(() => {
    if (typeof window !== "undefined") {
      getDirectorData(pId);
    }
  }, [pId]);

  const getDirectorData = async (userId) => {
    const accessToken = await localStorage.getItem("access_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}directors/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setDirectorData(data.data);
          setDirectorDetail(data.data.director);
          setDirectorPerformance(data.data.performances);
          console.log(JSON.stringify(data));
          console.log(data);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  const director = {
    name: `${directorData.name}`,
    profile: `${directorDetail.about_me}`,
    photo: `${directorData.main_photo}`,
    cost: `${directorDetail.desired_price}`,
    capacity: `${directorDetail.desired_capacity}`,
    schedule: `${directorDetail.free_schedule}`,
  };

  const results = {
    title: `${directorPerformance.name}`,
  };

  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/";
  const truePath = imgPath + director.photo;
  const image = directorData.main_photo == null ? noImage : truePath;

  //チャットデータの送信処理を行う
  const selectChatUser = async (userId) => {
    const accessToken = await localStorage.getItem("access_token");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}messages/open`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
          receiver: userId,
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
          // console.log(data);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  return (
    <Layout title={"演出家詳細"}>
      <div style={{ width: "960px" }}>
        <ProfileTopParts
          name={director.name}
          profile={director.profile}
          cost={director.cost}
          schedule={director.schedule}
          img={image}
          action={selectChatUser(pId)}
        />
          <div className="flex flex-col items-center w-100% mx-3 py-2  text-center text-base">
            <p className="w-full border-b pt-4">プロフィール</p>
            <div className="w-full m-3 p-5 bg-white text-base h-full">
              {director.profile}
            </div>
        </div>
        <ProfileMiddleParts />
        <ProfileResultsArea resultApi={directorPerformance} />
      </div>
    </Layout>
  );
};

export default Profile;
