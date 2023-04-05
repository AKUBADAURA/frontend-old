import React from "react";

const ItemAudio = (props) => {
  return (
    <audio 
    controls
    // preload="none"
    >
      <source className="w-100" src={props.resource} type="audio/mpeg" />
    </audio>
  );
};

export default ItemAudio;
