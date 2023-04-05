import React, { useEffect } from "react";

const ItemPDF = (props) => {
  useEffect(() => {
    console.log(`props pdf: ${props.resource}`)

    return () => {

    }
  }, [])

  return (
    <iframe
      src={`https://docs.google.com/gview?url=${props.resource}&embedded=true`}
      // src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"
      frameBorder="0"
      style={{ width: '100%', height: '30rem' }}
    ></iframe>
    // <embed
    //   src={props.resource}
    //   // src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
    //   // src="https://backend.development.snicpli-akubadaura.org/files/Presentaci%C3%B3n%20SNICPLI.pdf"
    //   // width="800"
    //   // height="500"
    // />
  );
};

export default ItemPDF;
