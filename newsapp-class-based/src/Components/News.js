import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { Spinner } from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
    }
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - News Monkey`
  }
  updateNews = async () => {
    this.props.setProgress(20)
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0db66c0e3aa4712b873c8906c03b19f&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    this.props.setProgress(50)
    let parseddata = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parseddata.articles,
      loading: false,
      totalArticles: parseddata.totalResults,
    })
  }
  async componentDidMount() {
    this.updateNews()
  }
  handleprevpage = async () => {
    this.setState({
      page: this.state.page - 1,
    })
    this.updateNews()
  }
  handlenextpage = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalArticles / this.props.pageSize)
    ) {
      this.setState({
        page: this.state.page + 1,
      })
    }
    this.updateNews()
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0db66c0e3aa4712b873c8906c03b19f&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parseddata = await data.json()
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalArticles: parseddata.totalResults,
    })
  }
  render() {
    return (
      <div className="container my3">
        <h2 className="text-center">
          NewsMonkey Top{' '}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{' '}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner />}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {this.state.articles.map((el) => {
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
              Math.ceil(this.state.totalArticles / this.props.pagesize)
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
}

export default News
