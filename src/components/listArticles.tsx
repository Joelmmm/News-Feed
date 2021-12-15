import { Card } from "antd";
import { Article } from "../fetchNews";

interface Props {
  articles: Article[]
}

function ListArticles({ articles }: Props) {
  return (
    <ul>
      {articles.map(article => (
        <Card key={article.abstract} title={"titleee"}>{article.abstract}</Card>
      ))}
    </ul>
  );
}

export default ListArticles;
