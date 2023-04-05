import React from "react";

const ItemDoc = (props) => {
  // return (<iframe src={props.resource} width='100%' height='100%' frameBorder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>);
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${props.resource}&embedded=true`}
      // src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"
      frameBorder="0"
      style={{width:'100%', height:'30rem'}}
    ></iframe>
  );
};

export default ItemDoc;
