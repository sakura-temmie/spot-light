import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layoutParts/Layout";
import ProfileTheaterTop from "../../components/profileParts/ProfileTheaterTop";
import ProfileTheaterDetail from "../../components/profileParts/ProfileTheaterDetail";
import noImage from "../../public/imgPlaceholder.png";

// post：getStaticPropsから取得したデータ
export default function Test({ post }) {
  const [theaterData, setTheaterData] = useState([]);
  const [theaterDetail, setTheaterDetail] = useState([]);

  const router = useRouter();
  const pId = router.query.id;
  //初回のみ実行
  useEffect(() => {
    if (typeof window !== "undefined") {
      getTheaterData(pId);
    }
  }, []);

  const getTheaterData = async (userId) => {
    const accessToken = await localStorage.getItem("access_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}theaters/${userId}`, {
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
          console.log(data.data);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  const theater = {
    title: `${theaterData.name}`,
    capacity: `${theaterDetail.capacity}`,
    station: `${theaterDetail.address}`,
    cost: `${theaterDetail.price}`,
    address: `${theaterDetail.address}`,
    schedule: `${theaterDetail.free_schedule}`,
    detail: `${theaterDetail.information}`,
    photo: `${theaterData.main_photo}`,
  };
  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/";
  const truePath = imgPath + theater.photo;
  const image = theaterData.main_photo == null ? noImage : truePath;
  return (
    <>
      <Layout title={"劇場詳細"}>
        <div style={{ width: "960px" }} className="pb-10">
          <ProfileTheaterTop
            title={theater.title}
            capacity={theater.capacity}
            station={theater.station}
            cost={theater.cost}
            address={theater.address}
            schedule={theater.schedule}
            img={image}
          />
          <ProfileTheaterDetail detail={theater.detail} />
        </div>
      </Layout>
    </>
  );
}
