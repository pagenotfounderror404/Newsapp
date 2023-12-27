import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)

  const updateNews = async () => {
    props.setProgress(20)
    setLoading(true)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d0db66c0e3aa4712b873c8906c03b19f&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url)
    props.setProgress(50)
    let parseddata = await data.json()
    props.setProgress(70)
    setArticles(parseddata.articles)
    setLoading(false)
    setTotalArticles(parseddata.totalResults)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    } - News Monkey`
    updateNews()
  }, [])
  const handleprevpage = async () => {
    this.setState({
      page: this.state.page - 1,
    })
    this.updateNews()
  }
  const handlenextpage = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalArticles / props.pageSize)
    ) {
      this.setState({
        page: this.state.page + 1,
      })
    }
    this.updateNews()
  }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=d0db66c0e3aa4712b873c8906c03b19f&page=${
      page + 1
    }&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url)
    let parseddata = await data.json()
    setArticles(articles.concat(parseddata.articles))
    setTotalArticles(parseddata.totalResults)
  }
  return (
    <div className="container my3">
      <h2 className="text-center">
        NewsMonkey Top{' '}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{' '}
        Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {articles.map((el) => {
            return (
              <div className="m-4" key={el.url}>
                <NewsItems
                  title={el.title.slice(0, 45) + '...'}
                  description={
                    el.description !== null
                      ? el.description.slice(0, 85) + '...'
                      : ' '
                  }
                  url={el.urlToImage}
                  newsUrl={el.url}
                  author={el.author}
                  date={new Date(el.publishedAt).toGMTString()}
                />
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevpage}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page ===
              Math.ceil(this.state.totalArticles / props.pagesize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextpage}
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News
