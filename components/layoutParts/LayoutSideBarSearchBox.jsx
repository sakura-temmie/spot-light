//演出家、劇場トップのサイドバーに配置する検索用のボックス
//title     => 大枠のタイトル
//inputType => inputのタイプを指定
//name1     => 上段のinputTypeのnameを指定
//subTitle1 => 上段のタイトルを指定
//name2     => 下段のinputTypeのnameを指定
//subTitle2 => 下段のタイトルを指定
//unit      => 単位名を指定

export default function LayoutSideBarSearchBox({
  title,
  inputType,
  name1,
  subTitle1,
  name2,
  subTitle2,
  unit = "",
  action1,
  action2
}) {
  {/* タイトルによってinputタグの幅を変更するための変数 */}
  const inputClassName = title === "使用料" || "希望利用額" ? "w-9/12 text-right" : "w-10/12 text-right"
  return (
    <>
      {/*  大枠のタイトルを受け取る  */}
      <p className="text-base"> {title} </p>
      <div className="container border-gray-400 border border-solid">
        {/*  上段  */}
        <div className="w-11/12 border-b border-blue-400 m-auto my-1">
          <p className="mb-2px">{subTitle1}</p>
          <input className={inputClassName} type={inputType} name={name1} onChange={e => action1(e.target.value)}/>
          <span> {unit} </span>
        </div>
        <p className="text-center">〜</p>
        {/*  下段  */}
        <div className="w-11/12 border-b border-blue-400 m-auto mb-2">
          <p className="mb-2px">{ subTitle2 }</p>
          <input className={inputClassName} type={inputType} name={name2} onChange={e => action2(e.target.value)}/>
          <span> {unit} </span>
        </div>
      </div>
    </>
  )
}
