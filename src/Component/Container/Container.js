import React, { Component } from "react";
import Category from "../category/category";
import "./container.css";
class Container extends Component {
  render() {
    const { categorys } = this.props;
    return (
      <div className="container">
        <Category categorys={categorys} />
      </div>
    );
  }
}

export default Container;
