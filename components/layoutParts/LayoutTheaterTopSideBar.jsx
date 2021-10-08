import {useState} from 'react'
import LayoutSideBarSearchBox from "./LayoutSideBarSearchBox";
import LayoutSideBarSelectBox from "./LayoutSideBarSelectBox";

//劇場topページのサイドバーを実装
//横幅はw-64で固定

export default function LayoutTheaterTopSideBar({ action }) {

  const [date, setDate] = useState("")

  return (
    <aside className="w-72">
      {/* <form className="sticky top-10"> */}
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="flex items-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p>検索する</p>
          </div>
          <div className="mb-2">
            <LayoutSideBarSelectBox
              title="カレンダー"
              subTitle="日程で絞り込み"
              name="month"
              optionData={[]}
              action={setDate}
            />
          </div>
          <div className="w-1/2 mx-auto">
            <button onClick={() => action(date) } className=" bg-yellow-300 hover:bg-yellow-400 text-white font-bold rounded w-full h-8 mt-3">
              検索
            </button>
          </div>
        </div>
      {/* </form> */}
    </aside>
  );
}
