import "./App.css";
import { getData, ArticleI } from "./fetchNews";
import { useEffect, useState } from "react";
import { BackTop, Col, message, Row } from "antd";
import Main from "./components/main";
import { useMediaQuery } from "react-responsive";
import About from "./components/about";

function App() {
  const [articles, setArticles] = useState([] as ArticleI[]);
  const [waitingForArticles, setWaitingForArticles] = useState(true);
  const [loadedPageNumber, setLoadedPageNumber] = useState(0);
  const [lastQuery, setLastQuery] = useState("");
  const isSmartphone = useMediaQuery({ query: '(max-width: 480px)'});

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
    setLoadedPageNumber(0);
  }

  async function onLoadMore() {
    setLoadedPageNumber(prev => prev + 1);
    setWaitingForArticles(true);
    const hideMessage = message.loading("Loading more articles...");
    const newData = await getData(lastQuery, loadedPageNumber + 1);
    if (newData.length < 1) {
      const hideErrorMessage = message.error("There are no more articles matching your query. Try looking for something else!");
      hideMessage();
      setWaitingForArticles(false);
      setTimeout(() => hideErrorMessage(), 3000);
      return
    }
    setArticles(prev => {
      return [...prev, ...newData];
    });
    setWaitingForArticles(false);
    hideMessage();
  }

  return (
    <div className='App'>
      
      <Row align='middle' justify='center'>
        <Col span={ isSmartphone ? 25 : 17}>
        <About/>
          <Main
            articles={articles}
            loadedPageNumber={loadedPageNumber}
            onSearch={onSearch}
            onLoadMore={onLoadMore}
            waitingForArticles={waitingForArticles}
          />
        </Col>
        <BackTop />
      </Row>
    </div>
  );
}

export default App;
