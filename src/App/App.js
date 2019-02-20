import React, { Component } from "react";
import Container from "../Component/Container/Container";
import "./App.css";
class App extends Component {
  render() {
    const { categorys } = this.props;
    return (
      <>
        <Container categorys={categorys} />
      </>
    );
  }
}

export default App;
