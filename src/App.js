import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      complete: false,
      url: document.location.href
    };
  }
  async idRequest(id) {
    let responseId = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let jsonPost = await responseId.json()
      .then(jsonPost => {
        document.location.href = `${document.location.href}${id}`
        this.setState({ jsonPost });
      });
  }
  async rout(url, id) {
    let resp;
    if (!id) {
      resp = await fetch(`${url}`);
    }
    else resp = await fetch(`${url}/${id}`);
    await resp.json()
      .then(json => {
        if (!id) this.setState({ json });
        else this.setState({ jsonPost: json });
      }).then(() => {
        if (!id) {
          const list = this.state.json.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <a href='#' onClick={this.idRequest.bind(this, item.id)}>
                    {item.id}
                  </a>
                </td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            );
          });
          this.table = list;
          this.setState({ complete: true })
        }
        else {
          let postInfo = this.state.jsonPost;
          this.setState({ complete: true })

          const list = (
            <div>
              Post details:
          <p>ID: {postInfo.id}</p>
              <p>User ID: {postInfo.userId}</p>
              <p>Title: {postInfo.title}</p>
              <p>Body: {postInfo.body}</p>
            </div>
          );
          this.post = { info: list, id };
        }
        return null;
      });
  }

  render() {
    if (!this.state.complete) {
      let id = document.location.hash.slice(1);
      this.rout(`https://jsonplaceholder.typicode.com/posts`, id)
    }
    if (!this.post && this.state.jsonPost) {
      let postInfo = this.state.jsonPost;
      return (
        <div>
          Post details:
          <p>ID: {postInfo.id}</p>
          <p>User ID: {postInfo.userId}</p>
          <p>Title: {postInfo.title}</p>
          <p>Body: {postInfo.body}</p>
        </div>
      );
    }
    else if (this.post) {
      return (
        <div>
          {this.post.info}
        </div>
      )
    }
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>{this.table ? this.table : <tr></tr>}</tbody>
      </table>
    );

  }
}

export default App;
