import { Card, Image, Skeleton } from "antd";
import { ArticleI } from "../fetchNews";
import { ExportOutlined } from "@ant-design/icons";

interface Props {
  articles: ArticleI[];
  isLoading: boolean;
}

function ListArticles({ articles, isLoading }: Props) {
  console.log("Ready: ", articles);

  return (
    <div>
      {isLoading && articles.length === 0 ?
      new Array(4).fill(<Card loading={isLoading}></Card>) :
      (articles.map(article => (
        <Card
          key={article.headline}
          loading={isLoading}
          bodyStyle={ { display: isLoading ? "" : "flex", justifyContent: "center" }}>
          {article.multimedia.empty ? (
            <></>
          ) : (
            <Image width='25vw' preview={false} src={article.multimedia.url} />
          )}
          <div
            className='article-wrapper'
            style={{ width: article.multimedia.empty ? "100%" : "75%" }}>
            <h2 className='article-headline'>{article.headline}</h2>
            <p className='article-abstract'>
              {sliceArticleAbstract(article.abstract)}
            </p>
            <a href={article.url}>
              Go to source <ExportOutlined />
            </a>
          </div>
        </Card>
      )))}
    </div>
  );
}

function sliceArticleAbstract(text: string) {
  const maxLength = 275;
  if (text.length < maxLength) return text;
  else return `${text.slice(0, text.lastIndexOf(" ", maxLength))}...`;
}

export default ListArticles;
