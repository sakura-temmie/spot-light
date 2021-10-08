import Layout from "../../components/layoutParts/Layout";
import EditButton from "../../components/editParts/EditButton";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import noImage from "../../public/imgPlaceholder.png";
// import { render } from "@headlessui/react/dist/utils/render";
import img from "../../public/banner.jpg";

const Profile_edit = () => {
  const [directorData, setDirectorData] = useState([]);
  const [directorDetail, setDirectorDetail] = useState([]);

  const director = {
    name: `${directorData.name}`,
    profile: `${directorDetail.about_me}`,
    photo: `${directorData.main_photo}`,
    cost: `${directorDetail.desired_price}`,
    schedule: `${directorDetail.free_schedule}`,
  };

  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [desiredPrice, setDesiredPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [freeSchedule, setFreeSchedule] = useState("");

  const inputRef = useRef(null);
  // const nameRef = useRef(null);

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };

  const handleImage = (e) => {
    const photo = e.target.files[0];
    localStorage.setItem("photo", e.target.files[0]);
    setPhoto(photo);
  };

  // console.log(photo);

  // const handleChangeFile = (e) => {
    //   setPhoto(() => {
      //     return file ? file : null;
      //   });
      // };
  //     const handleChangeFile = (e) => {
  //   localStorage.setItem("photo", e.target.files[0]);
  //   setPhoto(e.target.files[0]);
  // };

  // const handleChange = (e) => {
  //   setFile(e.target.files[0]);
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       document
  //         .getElementById("thumbnail")
  //         .setAttribute("src", e.target.result);
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

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
          localStorage.setItem("t_data-2", JSON.stringify(data));
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
  // getDirectorData();

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
          photo: photo,
          free_schedule: freeSchedule,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "application/octet-stream",
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw "認証が失敗しました";
          } else if (res.ok) {
            return res.json();
          }
        })
        // .then((data) => {
        //   localStorage.setItem("テスト01", JSON.stringify(data));
        // });
      // router.push("/top");
    } catch (err) {
      alert(err);
    }
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
                width={600} height={400}
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
          <div className="flex space-x-4 ">
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
      </div>
    </Layout>
  );
};

export default Profile_edit;
