import React, { Component } from 'react';
import './App.css';

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

    const query = '*[ _type == "post"]';

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
    posts.map((post) => fetchedPosts.push(post.title));

    this.setState({
      posts: fetchedPosts
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map((post) =>
          <p>{post}</p>
        )}
      </div>
    );
  }
}

export default App;
