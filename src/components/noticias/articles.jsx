import React from "react";
import Card from "./card";

const Articles = ({ articles }) => {
  //const
  //usestate
  //useeffect
  //functions
  const leftArticlesCount = Math.ceil(articles.length / 2);

  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  const articlesCount = Math.ceil(articles.length);
  return (
    <div className="container">
      <div className="row">
        {articles.map((article, i) => {
          return (
            <div className="col-6">
              <Card article={article} key={`article__${article.id}`} />
            </div>
          );
        })}
        {/* <div className="col-6">
          {rightArticles.map((article, i) => {
            return (
              <Card
                article={article}
                key={`article__left__${article.id}`}
              />
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Articles;
