import React from 'react'

const NewsItem = (props)=>{
    let { title, description, imageUrl, newsUrl, time, source, author } =props;
    return (

      <div>
        <div className="card my-3">
           <span className="position-absolute badge rounded-pill bg-danger" style={{zIndex:'1', right: 0}}>{source}
              <span className="visually-hidden">unread messages</span>
            </span>
          <img src={imageUrl} className="card-img-top" alt="no img" />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className=" text-body-danger">{author} {new Date(time).toUTCString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-light">Read More</a>
          </div>
        </div>
      </div>
    )
}
export default NewsItem
