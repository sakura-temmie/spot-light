import Layout from "../../components/layoutParts/Layout";
import ProfileTopParts from "../../components/profileParts/MyProfileTopParts";
import ProfileMiddleParts from "../../components/profileParts/ProfileMiddleParts";
import ProfileResultsArea from "../../components/profileParts/ProfileResultsArea";
import { useState, useEffect } from "react";
import ProfileButton from "../../components/profileParts/ProfileButton";
import noImage from "../../public/imgPlaceholder.png";

const MyProfile = () => {
  const [directorData, setDirectorData] = useState([]);
  const [directorDetail, setDirectorDetail] = useState([]);
  const [directorPerformance, setDirectorPerformance] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getDirectorData();
    }
  }, []);

  const getDirectorData = async () => {
    const accessToken = await localStorage.getItem("access_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}me/director`, {
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
          // localStorage.setItem("my_data", JSON.stringify(data.data));
          setDirectorData(data.data);
          setDirectorDetail(data.data.director);
          setDirectorPerformance(data.data.performances);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  const director = {
    name: `${directorData.name}`,
    profile: `${directorData.name}`,
    photo: `${directorData.main_photo}`,
    cost: `${directorDetail.desired_price}`,
    capacity: `${directorDetail.desired_capacity}`,
    schedule: `${directorDetail.free_schedule}`,
  };


  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/";
  const truePath = imgPath + director.photo;
  const image = directorData.main_photo == null ? noImage : truePath;

  return (
    <Layout title={"演出家詳細"}>
      <div style={{ width: "960px" }}>
        <ProfileButton path="/director/profile_edit" title="編集する" />
        <ProfileTopParts
          name={director.name}
          profile={director.profile}
          cost={director.cost}
          schedule={director.schedule}
          img={image}
          capacity={director.capacity}
        />
        <div className="flex justify-between px-3">
          <div className="flex w-1/2 justify-end">
            <ProfileMiddleParts />
          </div>
          <ProfileButton path="/director/action_edit" title={"追加する"} />
        </div>
        <ProfileResultsArea resultApi={directorPerformance} />
      </div>
    </Layout>
  );
};

export default MyProfile;
