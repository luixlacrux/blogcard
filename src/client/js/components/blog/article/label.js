import React from 'react'

export default class Label extends React.Component {
  render () {
    var btnClass = 'like'
    if (this.props.liked) btnClass += ' liked'
      
    return <div className="bottom">
      <button className={ btnClass }>
        <span className="icon-up"></span>
        <span className="likes">{ this.props.likes }</span>
      </button>
      <figure className="profile">
        <img 
          width="50" height="50"
          src={this.props.author.avatar}/>
      </figure>
      <div className="data">
        <a className="author">{ this.props.author.username }</a>
        <span className="tag">on Tech</span>
      </div>
    </div>
  }
}
