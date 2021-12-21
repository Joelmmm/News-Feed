import SearchBar from "./searchBar";
import ListArticles from "./listArticles";
import LoadMore from "./loadMore";
import { Empty } from "antd";
import { ArticleI } from "../fetchNews";

interface Props {
  onSearch: (term: string) => Promise<void>;
  waitingForArticles: boolean;
  articles: Array<ArticleI>;
  loadedPageNumber: number;
  onLoadMore: () => Promise<void>;
}

function Main({
  onSearch,
  waitingForArticles,
  articles,
  loadedPageNumber,
  onLoadMore
}: Props) {
  return (
    <>
      <SearchBar onSearch={onSearch} isLoading={waitingForArticles} />
      {articles.length === 0 && !waitingForArticles ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <ListArticles
            articles={articles}
            isLoading={waitingForArticles && loadedPageNumber === 0}
          />
          <LoadMore handleClick={onLoadMore} isLoading={waitingForArticles} />
        </>
      )}
    </>
  );
}

export default Main;
