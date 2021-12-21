import "./App.css";
import { getData, ArticleI } from "./fetchNews";
import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar";
import ListArticles from "./components/listArticles";
import { BackTop, Col, message, Row } from "antd";
import LoadMore from "./components/loadMore";

function App() {
  const [articles, setArticles] = useState([] as ArticleI[]);
  const [waitingForArticles, setWaitingForArticles] = useState(true);
  const [loadedPageNumber, setLoadedPageNumber] = useState(0);
  const [lastQuery, setLastQuery] = useState("");

  useEffect(() => {
    (async () => {
      setArticles(await getData());
      setWaitingForArticles(false);
    })();
  }, []);

  async function onSearch(term: string) {
    setWaitingForArticles(true);
    setArticles(await getData(term));
    setLastQuery(term);
    setWaitingForArticles(false);
  }

  async function onLoadMore() {
    setLoadedPageNumber(prev => prev + 1);
    setWaitingForArticles(true);
    const hideMessage = message.loading("Loading more articles...");
    const newData = await getData(lastQuery, loadedPageNumber + 1);
    setArticles(prev => {
      return [...prev, ...newData];
    });
    setWaitingForArticles(false);
    hideMessage();
  }

  return (
    <div className='App'>
      <Row align='middle' justify='center'>
        <Col span={17}>
          <SearchBar onSearch={onSearch} isLoading={waitingForArticles} />
          <ListArticles articles={articles} isLoading={waitingForArticles && loadedPageNumber === 0} />
          <LoadMore handleClick={onLoadMore} isLoading={waitingForArticles} />
        </Col>
        <BackTop />
      </Row>
    </div>
  );
}

export default App;
