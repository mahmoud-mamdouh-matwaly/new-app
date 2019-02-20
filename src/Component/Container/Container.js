import React, { Component } from "react";
import Categories from "../Categories/Categories";
import "./container.css";
class Container extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="container">
        <Categories categories={categories} />
      </div>
    );
  }
}

export default Container;
