import React from 'react'
import Target from './target'

export default class Card extends React.Component {
  render () {
    return <div className="card">
       <Target 
        title={this.props.title}
        date={this.props.date}/>

        <div className="stract">{ this.props.stract }</div>
    </div>
  }
}

