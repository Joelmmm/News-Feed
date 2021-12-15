import GuardianClient from "guardian-js";

interface RequestInfo {
  apiKey: string;
  baseUrl: string;
  endpoint: string;
}

export interface Article {
  abstract?: string;
}

class NYTimes implements RequestInfo {
  apiKey = "XS6HY5HQdLYHZ4m9uqAlGffHK3asmtgg";
  baseUrl = "https://api.nytimes.com/svc/search/v2";
  endpoint = "/articlesearch.json";
}

class Guardian implements RequestInfo {
  apiKey = "28be7665-f730-4bc8-be10-df2e4c176c30";
  baseUrl = "https://content.guardianapis.com";
  endpoint = "/search";
}

const guardian = new GuardianClient(new Guardian().apiKey, true);

export async function getData(queryTerm = 'Tech') {
  const source: RequestInfo = new NYTimes()
  const url =
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${queryTerm}&api-key=` +
    source.apiKey;
  const data = await fetch(url);
  const dataParsed = await data.json();
  let articles: Article[] = dataParsed.response.docs;
  const guardianArticles = await guardian.content.search(queryTerm, {
    section: "politics"
  });
  console.log((JSON.parse(guardianArticles.body).response.results));
  
  return articles;
}

