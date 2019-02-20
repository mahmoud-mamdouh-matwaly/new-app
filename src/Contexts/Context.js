import React from "react";
import API from "../utils/api";

export const DataContext = React.createContext();

export class DataProvider extends React.Component {
  state = {
    categories: []
  };

  handleData = data => {
    this.setState(state => ({
      categories: [
        ...state.categories,
        ...data.map(result => ({
          id: result.id,
          title: result.name
        }))
      ]
    }));
  };

  componentDidMount() {
    API.getCategories().then(this.handleData);
  }

  render() {
    return (
      <DataContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
