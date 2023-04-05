import React from "react";
import { Link } from "react-router-dom";
//import Link from "next/link";
import Image from "./image";

const Card = ({ article }) => {
  return (
    //Link as={`/article/${article.slug}`} href="/article/[id]">
    <a href={article.link} target="_blank" rel="noreferrer">  
      <div className="card card-muted mb-4">
        <div className="card-img-top">
          <Image image={article.imagen} />
        </div>
        <div className="card-body">
          <p id="category" className="text-uppercase">
            {/* {article.category.name} */}
          </p>
          <h4 id="titleCard" className="text-large">
            {article.titulo}
          </h4>
          <span>{article.fechaPublicacion}</span>
          
        </div>
      </div>
    </a> 
  );
};

export default Card;
