import { Card, Image, Skeleton } from "antd";
import { ArticleI } from "../fetchNews";
import { ExportOutlined } from "@ant-design/icons";

interface Props {
  articles: ArticleI[];
  isLoading: boolean;
}

function ListArticles({ articles, isLoading }: Props) {

  return (
    <div>
      {articles.map(article => (
        <Card
          key={article.headline}
          loading={isLoading}
          bodyStyle={{ display: "flex", justifyContent: "center" }}>
          {article.multimedia.empty ? (
            <></>
          ) : isLoading ? (
            <Skeleton.Image />
          ) : (
            <Image width='40vh' preview={false} src={article.multimedia.url} />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: article.multimedia.empty ? "100%" : "75%",
              paddingLeft: "1rem",
              alignItems: "center",
              justifyContent: "center"
            }}>
            <h2>{article.headline}</h2>
            <p>{article.abstract}</p>
            <a href={article.url}>
              Go to source <ExportOutlined />
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ListArticles;
