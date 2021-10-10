import Layout from "../../components/layoutParts/LayoutTheater";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import noImage from "../../public/imgPlaceholder.png";

const Edit = () => {
  const inputRef = useRef(null);
  const [theaterData, setTheaterData] = useState([]);
  const [theaterDetail, setTheaterDetail] = useState([]);

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [freeSchedule, setFreeSchedule] = useState("");
  const [information, setInformation] = useState("");

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };

  // //初回のみ実行
  useEffect(() => {
    if (typeof window !== "undefined") {
      getTheaterData();
    }
  }, []);

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
          localStorage.setItem("theater_data", JSON.stringify(data.data));
          setTheaterData(data.data);
          setTheaterDetail(data.data.theater);
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await localStorage.getItem("access_token");
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}me/theater`, {
        method: "POST",
        body: JSON.stringify({
          token: accessToken,
          name: name,
          capacity: capacity,
          area: area,
          price: price,
          address: address,
          // photo: photo,
          free_schedule: freeSchedule,
          information: information,
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
        .then((data) => {
          localStorage.setItem("the_post", JSON.stringify(data));
        });
      // router.push("/top");
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
    fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}me/theater/photo`, param)
      .then((res) => {
        if (res.status === 400) {
          throw "認証が失敗しました";
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(JSON.stringify(data));
      });
    // const accessToken = await localStorage.getItem("access_token");
    // const options = {
    //   method: "POST",
    //   body: photo,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // };
    // //コンテンツタイプヘッダを明示的に削除
    // delete options.headers["Content-Type"];
    // //API通信
    // await fetch(
    //   `${process.env.NEXT_PUBLIC_RESTAPI_URL}APIのエンドポイント`,
    //   options
    // )
    //   .then((res) => {
    //     if (res.status === 400) {
    //       throw "認証が失敗しました";
    //     } else if (res.ok) {
    //       return res.json();
    //     }
    //   })
    //   .then((data) => {
    //     console.log(JSON.stringify(data));
    //   });

    // try {

    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     // "Content-Type":
    //     //   "multipart/form-data; boundary=<calculated when request is sent>",
    //     // "Content-Length": "<calculated when request is sent>",
    //     // Host: "<calculated when request is sent>",
    //     // Accept: "*/*",
    //     // "Accept-Encoding": "gzip, deflate, br",
    //     // Connection: "keep-alive",
    //   },
    // })
    // } catch (err) {
    //   alert(err);
    // }
    // e.preventDefault();
    // // try {
    // const accessToken = await localStorage.getItem("access_token");
    // await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}me/theater/photo`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     token: accessToken,
    //   }),
    //   header: {
    //     Accept: "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(JSON.stringify(data));
    //   });
  };
  // })
  // };

  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/";
  const truePath = imgPath + theater.photo;
  const image = theaterData.main_photo == null ? noImage : truePath;

  return (
    <>
      <Layout title={"劇場詳細編集"}>
        <div style={{ width: "960px" }} className="mb-10 pb-20">
          <form className="mt-8 space-y-6" onSubmit={updateProfile}>
            <div className="flex space-x-4 justify-center">
              <div className="w-1/2 h-52">
                <input
                  className="w-full m-3 p-3 shadow-md text-center text-base"
                  value={name}
                  placeholder="劇場名"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  className="w-full m-3 p-3 shadow-md text-center text-base"
                  value={capacity}
                  placeholder="最大収容人数"
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                />
                <input
                  className="w-full m-3 p-3 shadow-md text-center text-base"
                  value={area}
                  placeholder="最寄駅"
                  onChange={(e) => {
                    setArea(e.target.value);
                  }}
                />
                <input
                  className="w-full m-3 p-3 shadow-md text-center text-base"
                  placeholder="利用金額"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="w-1/2 relative">
                {/* <input type="file" id="photo" /> */}
                <Image
                  className="object-contain h-48 w-full"
                  width={600}
                  height={400}
                  src={image}
                  alt="main Image"
                />
                <button
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
                  <span>　画像を追加する</span>
                </button>
                <input
                  hidden
                  name="photo"
                  ref={inputRef}
                  type="file"
                  onChange={handleImage}
                />
              </div>
            </div>
            <div className="flex space-x-4 justify-center">
              <input
                className="w-full m-3 p-2 shadow-md text-center text-base"
                type="text"
                value={address}
                placeholder="住所"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <input
                className="w-full m-3 p-2 shadow-md text-center text-base"
                type="text"
                placeholder="空きスケジュール（〜ヶ月以降 対応可能）"
                value={freeSchedule}
                onChange={(e) => {
                  setFreeSchedule(e.target.value);
                }}
              />
            </div>
            <div className="h-80 p-5 flex flex-col items-center">
              <div className="flex justify-center items-center w-full m-3 p-2 shadow-md text-center text-base">
                <p className="w-full">劇場情報</p>
              </div>
              <textarea
                placeholder="劇場の情報"
                className="w-full m-3 p-5 shadow-md text-base h-full"
                value={information}
                onChange={(e) => {
                  setInformation(e.target.value);
                }}
              />
              <button
                type="submit"
                className="group relative flex w-24 justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mt-10"
              >
                保存
              </button>
            </div>
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
    </>
  );
};

export default Edit;
