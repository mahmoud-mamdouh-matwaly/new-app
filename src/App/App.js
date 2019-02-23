import React, { Component } from "react";
import DataContext from "../Contexts/Context";
import API from "../utils/api";
import Categories from "../Component/Categories/Categories";

import "./App.css";
class App extends Component {
  state = {
    categoriesItem: [],
    IdCategory: []
  };

  handleCategories = data => {
    this.setState(() => ({
      categoriesItem: [
        ...data.map(result => ({
          id: result.id,
          title: result.name
        }))
      ]
    }));
  };

  componentDidMount() {
    API.getCategories().then(this.handleCategories);
  }

  getIdCategory = () => ({
    IdCategory: this.state.IdCategory,
    getIdCategory: id => {
      this.setState(state => ({
        IdCategory: id
      }));
    }
  });

  render() {
    const { categoriesItem } = this.state;
    return (
      <DataContext.Provider value={this.getIdCategory()}>
        <Categories categories={categoriesItem} />
      </DataContext.Provider>
    );
  }
}

export default App;
