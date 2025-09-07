import { useEffect, useState } from "react";
import { data } from "react-router-dom";

const News = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/news?tickers=AAPL,BTC")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setArticles(data);
            setLoading(false);
        });
    }, []);

    return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Recent News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
            {articles.map((item: any) => (
                <li key={item.title} className="mb-4">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-yellow-400 font-semibold">
                        {item.title}
                    </a>
                    <p>{item.summary || item.description || item.source || ""}</p>
                </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default News;
