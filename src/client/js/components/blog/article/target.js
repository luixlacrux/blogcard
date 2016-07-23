import React from 'react'

export default class Target extends React.Component {
  render () {
    return <span>
      <h3 className="title">
        <a href="#">{ this.props.title }</a>
      </h3>
      <time className="date">{ this.props.date }</time>
    </span>
  }
}