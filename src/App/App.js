import React, { Component } from "react";
import Container from "../Component/Container/Container";
import "./App.css";
class App extends Component {
  render() {
    const { categories } = this.props;
    return (
      <>
        <Container categories={categories} />
      </>
    );
  }
}

export default App;
