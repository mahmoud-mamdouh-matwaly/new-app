import React, { Component } from "react";
import DataContext from "../Contexts/Context";
import Categories from "../Component/Categories/Categories";
import SubCategories from "../Component/SubCategories/SubCategories";
import GenrePage from "../Component/GenrePage/GenrePage";
import "./App.css";
class App extends Component {
  state = {
    IdCategory: [],
    slugName: []
  };

  handleData = () => ({
    IdCategory: this.state.IdCategory,
    getIdCategory: id => {
      this.setState(() => ({
        IdCategory: id
      }));
    },
    getSlugName: slugName => {
      this.setState(state => ({
        ...state.IdCategory,
        slugName: slugName
      }));
    }
  });

  render() {
    const { IdCategory, slugName } = this.state;
    return (
      <DataContext.Provider value={this.handleData()}>
        <Categories />
        <SubCategories IdCategory={IdCategory} />
        <GenrePage slugName={slugName} />
      </DataContext.Provider>
    );
  }
}

export default App;
