import { NYTimes_apiKey } from "./apiKeys";

interface RequestInfo {
  apiKey: string;
  baseUrl: string;
  endpoint: string;
  imgBaseUrl: string;
}

export interface ArticleI {
  abstract: string;
  headline: string;
  multimedia: {
    url: string;
    empty: boolean;
  };
  url: string;
  pub_date: string;
  source: string;
}

class Article implements ArticleI {
  abstract: string;
  headline: string;
  multimedia: {
    url: string;
    empty: boolean;
  };
  url: string;
  pub_date: string;
  source: string;
  constructor(
    headline: string,
    abstract: string,
    multimedia: { url: string; empty: boolean },
    url: string,
    pub_date: string,
    source: string
  ) {
    this.headline = headline;
    this.multimedia = multimedia;
    this.abstract = abstract;
    this.url = url;
    this.pub_date = pub_date;
    this.source = source;
  }
}

const NYTimes: RequestInfo = {
  apiKey: NYTimes_apiKey,
  baseUrl: "https://api.nytimes.com/svc/search/v2",
  endpoint: "/articlesearch.json",
  imgBaseUrl: "https://www.nytimes.com/"
};

export async function getData(queryTerm = "", page = 0) {
  const source = NYTimes;
  const url = source.baseUrl + source.endpoint + `?q=${queryTerm}&page=${page}&api-key=${source.apiKey}`;
  const data = await fetch(url);
  const dataParsed = await data.json();

  let articles: Array<unknown> = dataParsed.response.docs;

  return articles.map(article => {
    return serializeArticle({ type: "nytimes", article });
  });
}

function serializeArticle(articleObj: {
  type: string;
  article: any;
}): ArticleI {
  const { type, article } = articleObj;

  switch (type) {
    case "nytimes": {
      return new Article(
        article.headline?.main,
        article.abstract || article.lead_paragraph,
        {
          empty: article.multimedia.length < 1,
          url: NYTimes.imgBaseUrl + article.multimedia[0]?.url
        },
        article.web_url,
        article.pub_date,
        article.source
      );
    }
    default:
      return article;
  }
}
