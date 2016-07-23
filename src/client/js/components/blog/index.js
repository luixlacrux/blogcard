import React from 'react'
import Article from './article/article'
import request from 'superagent'
import socket from 'socket.io-client' 

export default class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = { articles: [] }
  }

  componentWillMount () {
    /*request
      .get('/api/articles')
      .end((err, res) => {
        if (err)
          return console.log(err)
        let articles = res.body
        articles.forEach(this.newArticle, this)
      })
    */
    this.socket = socket.connect('http://10.0.0.43:3000')
    this.socket.on('article',  article => this.newArticle(article))
    this.socket.on('articles', articles => {
      articles.forEach(this.newArticle, this)
    })
  }

  newArticle (article) {
    this.state.articles.push(article)
    let articles = this.state.articles
    this.setState({ articles: articles })
  }

  render () {
    if (this.state.articles.length) {
      return <section className='Content'>{
        this.state.articles.map(article => {
          return <Article
            key={article.id}
            title={article.title}
            author={article.author}
            date={article.date}
            image={article.image}
            tag={article.image}
            stract={article.stract}
            likes={article.likes}
            liked={article.liked} />
        })
      }
      </section>
    }

   return <div className="loader"></div>
  }
}
