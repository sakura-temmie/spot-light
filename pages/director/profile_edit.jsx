import Layout from "../../components/layoutParts/Layout";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import noImage from "../../public/imgPlaceholder.png";
import { useRouter } from "next/router";

const Profile_edit = () => {
  const [directorData, setDirectorData] = useState([]);
  const [directorDetail, setDirectorDetail] = useState([]);
  const router = useRouter();

  const director = {
    name: `${directorData.name}`,
    profile: `${directorDetail.about_me}`,
    photo: `${directorData.main_photo}`,
    cost: `${directorDetail.desired_price}`,
    capacity: `${directorDetail.desired_capacity}`,
    schedule: `${directorDetail.free_schedule}`,
  };

  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [desiredPrice, setDesiredPrice] = useState("");
  const [desiredCapacity, setDesiredCapacity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [freeSchedule, setFreeSchedule] = useState("");
  const inputRef = useRef(null);

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };

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
          // localStorage.setItem("t_data-2", JSON.stringify(data));
          setDirectorData(data.data);
          setDirectorDetail(data.data.director);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getDirectorData();
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await localStorage.getItem("access_token");
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}me/director`, {
        method: "POST",
        body: JSON.stringify({
          token: accessToken,
          name: name,
          about_me: aboutMe,
          desired_price: desiredPrice,
          desired_capacity: desiredCapacity,
          // photo: photo,
          free_schedule: freeSchedule,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw "認証が失敗しました";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          router.push("/director/myProfile");
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleImage = (e) => {
    const accessToken = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    formData.append("token", accessToken);
    setPhoto(formData);
  };

  const updatePhoto = async (e) => {
    e.preventDefault();
    const param = {
      method: "POST",
      body: photo,
    };
    fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}me/director/photo`, param)
      .then((res) => {
        if (res.status === 400) {
          throw "認証が失敗しました";
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        router.push("/director/myProfile");
      });
  };

  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/";
  const truePath = imgPath + director.photo;
  const image = directorData.main_photo == null ? noImage : truePath;

  return (
    <Layout title={"演出家プロフィール編集"}>
      <div style={{ width: "960px" }}>
        <form onSubmit={updateProfile}>
          <div className="flex justify-end m-4">
            <div className="justify-center">
              <button
                type="submit"
                className="group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 m-auto mt-6"
              >
                保存する
              </button>
            </div>
          </div>
          <div className="flex space-x-4 justify-center">
            <div className="w-1/2 h-52">
              <input
                className="w-full m-3 p-3 shadow-md text-center text-base"
                value={name}
                placeholder="お名前を入力してください"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <textarea
                className="w-full m-3 p-5 shadow-md text-base h-full"
                // defaultValue={director.profile}
                value={aboutMe}
                placeholder="プロフィールを入力してください"
                onChange={(e) => {
                  setAboutMe(e.target.value);
                }}
              />
            </div>
            <div className="w-1/2 relative">
              <Image
                className="object-contain h-48 w-full"
                width={600}
                height={400}
                src={image}
                alt="main Image"
              />
              {/* <p>こちらの画像に変更します　 {photo} </p> */}
              {/* <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 inline-flex items-center absolute top-0 right-0"
                onClick={fileUpload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <span>　画像を追加する</span> */}
              {/* </button> */}
              <input
                // hidden
                // ref={inputRef}
                type="file"
                onChange={handleImage}
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <div>
              <p>希望利用額　　　（万円）</p>
              <input
                className="w-full m-3 p-2 shadow-md text-center text-base"
                type="text"
                defaultValue={""}
                placeholder="希望利用額"
                // defaultValue={director.cost}
                onChange={(e) => {
                  setDesiredPrice(e.target.value);
                }}
              />
            </div>
            <div className="pl-6">
              <p>空きスケジュール　　　（ヶ月以降）</p>
              <input
                className="w-full m-3 p-2 shadow-md text-center text-base"
                type="text"
                defaultValue={""}
                // defaultValue={director.schedule}
                placeholder="空きスケジュール"
                onChange={(e) => {
                  setFreeSchedule(e.target.value);
                }}
              />
            </div>
            <div className="pl-6">
              <p>希望収容人数　　　（人）</p>
              <input
                className="w-full m-3 p-2 shadow-md text-center text-base"
                type="text"
                defaultValue={""}
                // defaultValue={director.schedule}
                placeholder="希望収容人数"
                onChange={(e) => {
                  setDesiredCapacity(e.target.value);
                }}
              />
            </div>
          </div>
          {/* <ProfileActorResults
          title={results.title}
          theaterName={results.theaterName}
          schedule={results.schedule}
          time={results.time}
          customer={results.customer}
          actButton={"作品内容"}
          actModalTitle={act.title}
          actModalText={act.text}
          castButton={"出演キャスト"}
          castModalTitle={"出演キャスト"}
          castModalText={cast.cast}
        />*/}
        </form>
        <form onSubmit={updatePhoto}>
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 m-auto mt-6"
          >
            画像を更新する
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile_edit;
