import React from 'react'
import Front from './front'
import Card from './card'
import Label from './label'

export default class Article extends React.Component {
  render () {
    return <article className="Content-article">
      <Front
        title={this.props.title}
        date={this.props.date}
        image={this.props.image}/>
      <Card
        title={this.props.title}
        date={this.props.date}
        stract={this.props.stract}/>
      <Label
        author={this.props.author}
        likes={this.props.likes}
        liked={this.props.liked}
        tag={this.props.tag}/>
    </article>
  }
}

