import React from 'react'
import Target from './target'

export default class Front extends React.Component {
  render () {
    return <header className="header">
      <img src={this.props.image} alt={this.props.title}/>
      <Target 
        title={this.props.title}
        date={this.props.date}/>
    </header>
  }
}
