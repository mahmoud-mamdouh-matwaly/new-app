import React from "react";
import API from "../utils/api";

export const DataContext = React.createContext();

export class DataProvider extends React.Component {
  state = {
    categorys: []
  };

  handleData = data => {
    this.setState(state => ({
      categorys: [
        ...state.categorys,
        ...data.map(result => ({
          id: result.id,
          title: result.name
        }))
      ]
    }));
  };

  componentDidMount() {
    API.getCategorys().then(this.handleData);
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
