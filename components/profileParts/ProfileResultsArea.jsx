import React from "react";
import ProfileActorResults from "./ProfileActorResults";

const ProfileResultsArea = ({ resultApi }) => {
  return (
    <div>
      {resultApi.map((api) =>
        <ProfileActorResults
          key={api.id}
          title={api.name}
          theaterName={api.theater_name}
          schedule={api.start_date}
          time={api.times}
          customer={api.customer_attraction_rate}
          actButton={"作品内容"}
          actModalTitle={api.name}
          actModalText={api.contents}
          castButton={"出演キャスト"}
          castModalTitle={"出演キャスト"}
          castModalText={api.casts}
          />
      )}
    </div>
  );
};

export default ProfileResultsArea;
