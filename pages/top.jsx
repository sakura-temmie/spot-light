import { useState, useEffect, useContext } from "react";
import LayoutDirectorTop from "../components/layoutParts/LayoutDirectorTop";
import LayoutTheaterTop from "../components/layoutParts/LayoutTheaterTop";


export default function Home() {
  //state
  const [page, setPage] = useState("");

  //初回のみ実行
  useEffect(() => {
    selectPage();
  }, []);

  //ロールによってpageを切り分ける
  const showPage = (role) => {
    return role === 10 ? <LayoutTheaterTop /> : <LayoutDirectorTop />;
  };

  //クッキーの認証トークンを取得後、ページをセット
  const selectPage = async () => {
    const accessToken = await localStorage.getItem("access_token");
    //クッキーの取得
    // const accessToken = await new Cookie().get("access_token");
    // await setAccessToken(new Cookie().get("access_token"))
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}get_user`, {
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
          setPage(showPage(data.user.role));
        });
    } catch (err) {
      alert(err);
      return;
    }
  };

  return (
    <>
      {/* <Layout title="Top"> */}
        {/* ページをを実装する */}
        {page}
      {/* </Layout> */}
    </>
  );
}
