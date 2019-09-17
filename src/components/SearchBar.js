import React, { Component } from "react";
import axios from 'axios'; 
import SearchResults from './SearchResults'
import './style.css';




const API_KEY = process.env.REACT_APP_API_KEY; 

 class SearchBar extends Component {
     state = {
         value: "",
         searchResult:[],
         message: ''
     }

     handleChange = (e) =>{
         this.setState({
             value: e.target.value
         })
     }
     handleSubmit = (e) => {
         e.preventDefault()
         const searchValue = this.state.value
         axios.get(`https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=25&orientation=landscape&query=${searchValue}}`).then(res => {
            if(res.data.results.length===0){
                this.setState({message:'No Matches Found'})
            }
            else{
             this.setState({
                 
                 searchResult: res.data.results,
                 message: ''
             })
            } 
                
 })
     }
     

  render() {
    return (
    
      <div>
          <form onSubmit={this.handleSubmit} className="search-container">
                  <input
                        class="field-container text-dark"
                        type='text'
                        id='search-bar'
                        style={{'border-radius':'5px', width:'30%', justifyContent:'center'}}
                        value={this.state.value}
                        placeholder="Search Images..."
                        onChange={this.handleChange}/>
             
          <button className="btn-success btn-large" style={{'border-radius': '5px', 'margin-right': '2px'}}type="submit">Search<i class="fa fa-search"></i></button>
          </form>
          <h1 class='msg'>{this.state.message}</h1>
          <SearchResults results={this.state.searchResult}/>
      </div>
    )
  }
}

export default SearchBar