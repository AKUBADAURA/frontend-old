import React from "react";

const ItemYoutube = (props) => {
  return (
    <iframe
      className="w-100"
      width="560"
      height="315"
      src={props.resource}
      // title="YouTube video player"
      title={props.title}
      frameBorder="0"
      // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default ItemYoutube;
