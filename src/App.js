import React, { Component } from 'react';
import './App.css';

import Post from './components/post';

const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '6en4zynu',
  dataset: 'production',
  useCdn: false
});

class App extends Component {

  constructor(props) {
    super(); 
    
    this.state = {
      posts: []
    }
  }

  componentWillMount() { 
    const query = '*[ _type == "post"] {title, body}';

    client
      .fetch(query)
      .then(posts => {
        this.handleResults(posts);
      })
      .catch(err => {
        console.error('Oh no, error occured: ', err)
      }
    );

  }

  handleResults = (posts) => {
    var fetchedPosts = [];
    posts.map((post) => fetchedPosts.push(post));

    this.setState({
      posts: fetchedPosts
    });

    console.log(fetchedPosts);
  }

  render() {
    return (
      <div className="App">
        <div className="posts">
          {this.state.posts.map((post, key) =>
            <Post post={post} key={key}/>          
          )}
        </div>
      </div>      
    );
  }
}

export default App;
