import LayoutTheaterTopCard from './LayoutTheaterTopCard';

export default function LayoutTheaterCardArea({ directorApi, path }) {
  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/"
  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {directorApi.map(api =>
        <div className="mx-auto" key={api.id}>
          <LayoutTheaterTopCard
            id          = { api.id }
            imgUrl      = { imgPath + api.main_photo }
            name        = { api.name }
            totalNumberPerformances = { api.performances_count }
            currentPerformance      = {api.performances[0]?.name}
            path        = {path}
          />
        </div>
      )}
    </div>
  )
}
