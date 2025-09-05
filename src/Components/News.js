import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner1';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizefirstletter( props.category)}- Headlines`

    const capitalizefirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url); //fetching data from the url, fetch() returns a promise
        props.setProgress(30);
        let parsedData = await data.json(); //converting the data into json format, json() also returns a promise
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        console.log(parsedData);
        props.setProgress(100);

    }

    useEffect(() => {
        updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1) //incrementing the page number by 1
        let data = await fetch(url); //fetching data from the url, fetch() returns a promise
        let parsedData = await data.json(); //converting the data into json format, json() also returns a promise
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))  //concat() joins two or more arrays and returns a new array
        setTotalResults(parsedData.totalResults)
    };
    return (
        <>
            <div className='container my-3'>
                <h1 className="text-center p-2 text-black " style={{ margin: '25px 0px', marginTop: '90px' }}> SnapNews - Top {capitalizefirstletter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }>
                    <div>
                        <div className="row">
                            {articles.map((element) => { //map() highr order function that runs a function on every element of the array and returns a new array
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://ichef.bbci.co.uk/news/1024/branded_news/15d1/live/177c76f0-86b9-11f0-84c3-3f41d5d4c3e3.jpg"} newsUrl={element.url} time={element.publishedAt} source={element.source.name} author={element.author} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </div>
        </>)

}
News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News