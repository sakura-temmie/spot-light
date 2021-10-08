//演出家、劇場トップのサイドバーに配置する検索用のボックス
//title      => 大枠のタイトル
//subTitle   => サブタイトルを指定
//name       => selectboxのnamwを指定
//optionData => optionに挿入するデータ（配列）

export default function LayoutSideBarSelectBox({
  title,
  subTitle,
  name,
  optionData,
  action
}) {
  {/*  titleの値によってSelectBoxを出し分ける   */ }
  const months = ["",1,2,3,4,5,6,7,8,9,10,11,12]
  let select
  if (title === "カレンダー") {
    select =
      <div>
        <span>直近 </span>
        <select className="border border-blue-400" name={name} onChange={e => action(e.target.value)}>
          {months.map(month => <option key={month} value={month}> {month} </option>)}
        </select>
        <span> 月以降の空き</span>
      </div>
  } else {
    select =
      <select className="w-full border border-blue-400" name={name}  onChange={e => action(e.target.value)}>
        {optionData.map((data,index) => <option key={index} value={index === 0 ? "" : index}> {data} </option>)}
      </select>
  }
  return (
    <>
      {/*  大枠のタイトルを受け取る  */}
      <p className="text-base"> {title} </p>
      <div className="container border-gray-400 border border-solid">
        <div className="w-11/12 m-auto mt-2 mb-4">
          <p className="mb-2">{subTitle}</p>
          { select }
        </div>
      </div>
    </>
  )
}
