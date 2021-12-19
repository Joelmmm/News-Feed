import "./App.css";
import "antd/dist/antd.css";
import { getData, ArticleI } from "./fetchNews";
import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar";
import ListArticles from "./components/listArticles";
import { Col, Row } from "antd";

function App() {
  const [articles, setArticles] = useState([] as ArticleI[]);
  const [waitingForArticles, setWaitingForArticles] = useState(true)

  useEffect(() => {
    (async () => {
      setArticles(await getData());
      setWaitingForArticles(false);
    })();
  }, []);

  async function onSearch(term: string) {
    setWaitingForArticles(true);
    setArticles(await getData(term));
    setWaitingForArticles(false);
  }

  return (
    <div className='App'>
      <Row align='middle' justify='center'>
        <Col span={17}>
          <SearchBar onSearch={onSearch} />
          <ListArticles articles={articles} isLoading={waitingForArticles} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
