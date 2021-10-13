import LayoutTheater from "../../components/layoutParts/LayoutTheater";
import { useState, useEffect } from "react";
import ProfileButton from "../../components/profileParts/ProfileButton";
import ProfileTheaterTop from "../../components/profileParts/MyProfileTheaterTop";
import ProfileTheaterDetail from "../../components/profileParts/ProfileTheaterDetail";
import noImage from "../../public/imgPlaceholder.png";

const MyProfile = () => {
  const [theaterData, setTheaterData] = useState([]);
  const [theaterDetail, setTheaterDetail] = useState([]);

  // //初回のみ実行
  useEffect(() => {
    if (typeof window !== "undefined") {
      getTheaterData();
    }
  }, []);

  const getTheaterData = async () => {
    const accessToken = await localStorage.getItem("access_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}me/theater`, {
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
          setTheaterData(data.data);
          setTheaterDetail(data.data.theater);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  const theater = {
    name: `${theaterData.name}`,
    photo: `${theaterData.main_photo}`,
    cost: `${theaterDetail.price}`,
    schedule: `${theaterDetail.free_schedule}`,
    address: `${theaterDetail.address}`,
    area: `${theaterDetail.area}`,
    capacity: `${theaterDetail.capacity}`,
    info: `${theaterDetail.information}`,
  };

  // const results = {
  //   title: `${directorPerformance.name}`,
  // };

  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/";
  const truePath = imgPath + theater.photo;
  const image = theaterData.main_photo == null ? noImage : truePath;

  return (
    <LayoutTheater title={"演出家詳細"}>
      <div style={{ width: "960px" }} className="pb-10 mb-10">
        <ProfileButton path="/theater/edit" title="編集する" />
        <ProfileTheaterTop
          title={theater.name}
          capacity={theater.capacity}
          station={theater.station}
          cost={theater.cost}
          address={theater.address}
          schedule={theater.schedule}
          img={image}
        />
        <ProfileTheaterDetail detail={theater.info} />
      </div>
    </LayoutTheater>
  );
};

export default MyProfile;
