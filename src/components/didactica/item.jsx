import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ItemAudio from "./item-audio";
import ItemDoc from "./item-doc";
import ItemImage from "./item-image";
import ItemPDF from "./item-pdf";
import ItemVideo from "./item-video";
import ItemYoutube from "./item-youtube";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#b3e3b261'
  }
})

const Item = (props) => {

  const { item } = props
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root + ' w-100'} variant="outlined">
        <CardContent>
          <div className="w-100 d-flex justify-content-center">

            {item.type === 'video' ? <ItemVideo resource={item.resource} /> : null}
            {item.type === 'image' ? <ItemImage title={item.title} resource={item.resource} /> : null}
            {item.type === 'audio' ? <ItemAudio resource={item.resource} /> : null}
            {item.type === 'youtube' ? <ItemYoutube resource={item.resource} title={item.title} /> : null}
            {item.type === 'PDF' ? <ItemPDF resource={item.resource} /> : null}
            {item.type === 'doc' ? <ItemDoc resource={item.resource} /> : null}


          </div>
          <div className="container text-justify">
            <h4 className="titleItem">{item.title}</h4>
            {item.description}
            <hr className="divider-small divisor" />
            <div className="width-expand">
              <p className="mb-0">Por {item.author}</p>
              <p className="text-meta mt-0">
                Publicado: {item.publishedAt}
              </p>
              <p className="text-meta mt-0">
                Tipo: {item.type}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Item;
