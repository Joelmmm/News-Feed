import "./App.css";
import "antd/dist/antd.css";
import { getData, Article } from "./fetchNews";
import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar";
import ListArticles from "./components/listArticles";

function App() {
  const [articles, setArticles] = useState([] as Article[]);

  useEffect(() => {
    (async () => setArticles(await getData()))();
  }, [])

  async function onSearch(term: string) {
    setArticles(await getData(term))
  }

  return (
    <div className='App'>
      <SearchBar onSearch={onSearch} />
      <ListArticles articles={articles} />
    </div>
  );
}

export default App;
