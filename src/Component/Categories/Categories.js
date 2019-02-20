import React, { Component } from "react";
import API from "../../utils/api";
import PropTypes from "prop-types";
import SubCategories from "../SubCategories/SubCategories";
import "./Categories.css";

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array
  };
  static defaultProps = {
    categories: []
  };
  state = {
    subCategories: [],
    active: null
  };

  loadCategoryData = categoryId => {
    if (categoryId) {
      API.getSubCategories(categoryId).then(data => {
        this.setState({
          active: categoryId,
          subCategories: [
            ...data.map(result => ({
              id: result.id,
              title: result.name,
              slug: result.slug
            }))
          ]
        });
      });
    }
  };

  componentDidMount() {
    this.loadCategoryData();
  }

  render() {
    const { categories } = this.props;
    const { subCategories, active } = this.state;
    return (
      <>
        <header className="header">
          <nav className="header__navigation">
            <ul className="header__list">
              {categories.map(res => (
                <li className="header__item" key={res.id}>
                  <button
                    type="button"
                    className={
                      active === res.id ? "button-active" : "link-button"
                    }
                    onClick={() => this.loadCategoryData(res.id)}
                  >
                    {res.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <SubCategories subCategories={subCategories} />
      </>
    );
  }
}

export default Categories;
