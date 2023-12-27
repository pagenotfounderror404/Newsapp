import React, { Component } from 'react'

const NewsItems = (props) => {
  let { title, description, url, newsUrl, author, date } = props
  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <img src={url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : 'Unknown'} on {date}
            </small>
          </p>
          <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsItems
