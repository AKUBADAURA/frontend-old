import React, { useEffect } from "react";

const ItemVideo = (props) => {
  return (
    <video
      width="100%"
      controls
      // preload="none"
      // poster="img/backgroundItem.png"
    >
      {/* <source src='https://nubecolectiva.com/blog/tutos/demos/video_fijo_flotante/video/video.mp4' type='video/mp4' /> */}
      <source src={props.resource} type="video/mp4" />
    </video>
  );
};

export default ItemVideo;
