"use client";
import { copy, linkIcon, loader, tick } from "@/assets";
import Image from "next/image";
import React, { useEffect } from "react";
import { useLazyGetSummaryQuery } from "@/services/article";
import { error } from "console";

const Demo = () => {
  const [article, setArticle] = React.useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = React.useState<Array<unknown>>([]);
  const [copied, setCopied] = React.useState("");

  const [getSummary, { data, isFetching, isLoading, error }] =
    useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );
    if (articlesFromLocalStorage.length > 0) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getSummary({ url: article.url });
    if (data) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [...allArticles, newArticle];
      setArticle({ ...article, summary: data.summary });
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyurl: string) => {
    if (copyurl) setCopied(copyurl);
    navigator.clipboard.writeText(article.summary);
    setTimeout(() => {
      setCopied("");
    }, 5000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <Image
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 my-2 ml-3"
            width={20}
            height={20}
          />
          <input
            type="url"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            placeholder="Enter your link here"
            className="url_input peer text-ellipsis"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            summarize
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article: any, index: number) => (
            <div
              key={`link=${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <Image
                  src={copied === article.url ? tick : copy}
                  alt="copy icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching || isLoading ? (
          <Image
            src={loader}
            alt="loader"
            width={40}
            height={40}
            className="object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            well,That was not supposed to happen...
            <br />
            <span>please try again later</span>
          </p>
        ) : (
          article.summary && (
            <div className="flex  flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600">
                Article<span className="blue_gradient"> Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-gray-600 text-sm">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
