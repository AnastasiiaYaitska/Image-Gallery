import { Component } from "react";
// import { toast } from 'react-toastify';
import { Searchbar, SearchForm, SearchFormButton, ButtonLabel, SearchFormInput } from "./SearchBar.styled";
import { BiSearch } from "react-icons/bi";



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
    // if (!this.keyWord) {
    //   return toast.error(' Enter keyword')
    // };
    this.props.onSubmit(this.state.keyWord);
    
 

  };

  // reset = () => { 
  //   this.setState({keyWord: ''})
  // };

  render() {
      return (
<Searchbar >
  <SearchForm onSubmit={this.handlerSubmit}>
    <SearchFormButton type="submit">
              <ButtonLabel>
                <BiSearch />
              </ButtonLabel>
    </SearchFormButton>

    <SearchFormInput
      type="text"
      autoComplete="off"
      autoFocus
      name="keyWord"
      placeholder="Search images and photos"
      value={this.state.keyWord}
      onChange={this.handlerChange}
    />
  </SearchForm>
</Searchbar>
    )
    }
 };