


const Image = ({ image, style }) => {
  //const imageUrl = getStrapiMedia(image);

  return (
    <img
      src={image}
      alt={'article'}
      style={style}
      className="w-100"
    />
  );
};

export default Image;
