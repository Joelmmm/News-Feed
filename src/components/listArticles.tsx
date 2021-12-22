import { Card, Image } from "antd";
import { ArticleI } from "../fetchNews";
import { ExportOutlined } from "@ant-design/icons";
import InfoTags from "./infoTags";
import { useMediaQuery } from "react-responsive";

interface Props {
  articles: ArticleI[];
  isLoading: boolean;
}

function ListArticles({ articles, isLoading }: Props) {
  const isTabletOrSmartphone = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div>
      {isLoading && articles.length === 0
        ? new Array(4).fill(<Card loading={isLoading}></Card>)
        : articles.map(article => (
            <Card
              key={article.headline}
              loading={isLoading}
              bodyStyle={{
                display: isLoading ? "" : "flex",
                justifyContent: "center"
              }}>
              {article.multimedia.empty ? (
                <></>
              ) : (
                <Image
                  width={isTabletOrSmartphone ? "100%" : "25vw"}
                  preview={false}
                  src={article.multimedia.url}
                />
              )}
              <div
                className='article-wrapper'
                style={{
                  width:
                    article.multimedia.empty || isTabletOrSmartphone
                      ? "100%"
                      : "75%"
                }}>
                <h2 className='article-headline'>{article.headline}</h2>
                <p className='article-abstract'>
                  {sliceArticleAbstract(article.abstract)}
                </p>
                <a href={article.url}>
                  Go to source <ExportOutlined />
                </a>
                <InfoTags date={article.pub_date} source={article.source} />
              </div>
            </Card>
          ))}
    </div>
  );
}

function sliceArticleAbstract(text: string) {
  const maxLength = 275;
  if (text.length < maxLength) return text;
  else return `${text.slice(0, text.lastIndexOf(" ", maxLength))}...`;
}

export default ListArticles;
