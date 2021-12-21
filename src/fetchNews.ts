import GuardianClient from "guardian-js";
import { GuardianApiKey, NYTimes_apiKey } from "./apiKeys";

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
}

class Article implements ArticleI {
  abstract: string;
  headline: string;
  multimedia: {
    url: string;
    empty: boolean;
  };
  url: string;
  constructor(
    headline: string,
    abstract: string,
    multimedia: { url: string; empty: boolean },
    url: string
  ) {
    this.headline = headline;
    this.multimedia = multimedia;
    this.abstract = abstract;
    this.url = url;
  }
}

const NYTimes: RequestInfo = {
  apiKey: NYTimes_apiKey,
  baseUrl: "https://api.nytimes.com/svc/search/v2",
  endpoint: "/articlesearch.json",
  imgBaseUrl: "https://www.nytimes.com/"
};

class Guardian implements RequestInfo {
  apiKey = GuardianApiKey;
  baseUrl = "https://content.guardianapis.com";
  endpoint = "/search";
  imgBaseUrl = "";
}

//const guardian = new GuardianClient(new Guardian().apiKey, true);

export async function getData(queryTerm = "", page = 0) {
  const source = NYTimes;
  const url =
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${queryTerm}&page=${page}&api-key=` +
    source.apiKey;
  const data = await fetch(url);
  const dataParsed = await data.json();
  
  let articles: Array<any> = dataParsed.response.docs;
  console.log("Raw: ", articles);
  

  /*   const guardianArticles = await guardian.content.search(queryTerm, {
    section: "politics"
  }); */

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
        (article.abstract || article.lead_paragraph),
        {
          empty: article.multimedia.length < 1,
          url: NYTimes.imgBaseUrl + article.multimedia[0]?.url
        },
        article.web_url
      );
    }
    /* case "guardian": {
      return new Article(article.webTitle, "Nothing Hereeeeeeee", {url: article.})
    } */
    default:
      return article;
  }
}
