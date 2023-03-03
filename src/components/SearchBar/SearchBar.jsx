import { Component } from "react";

export class SearchBar extends Component {

  state = {
    keyWord: '',
    
  }
  
  handlerChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  };

  handlerSubmit = (event) => { 
    event.preventDefault();
    this.props.onSubmit(this.state.keyWord);
    this.reset()

  };

  reset = () => { 
    this.setState({keyWord: ''})
  };

  render() {
      return (
        <header className="searchbar">
          <form onSubmit={this.handlerSubmit}
            className="form">
    <button type="submit" className="button">
      <span className="button-label">Search</span>
    </button>

    <input
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      name="keyWord"
      placeholder="Search images and photos"
      value={this.state.keyWord}
      onChange={this.handlerChange}
    />
  </form>
</header>
    )
    }
 };