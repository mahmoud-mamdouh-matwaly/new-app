import React, { Component } from "react";
import API from "../../utils/api";
import PropTypes from "prop-types";
import SubCategorys from "../SubCategorys/SubCategorys";
import "./category.css";

class Category extends Component {
  static propTypes = {
    categorys: PropTypes.array
  };
  static defaultProps = {
    categorys: []
  };
  state = {
    subCategorys: []
  };

  loadCategoryData = categoryId => {
    if (categoryId) {
      API.getSubCategorys(categoryId).then(data => {
        this.setState({
          subCategorys: [
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
    const { categorys } = this.props;
    const { subCategorys } = this.state;
    return (
      <>
        <header className="header">
          <nav className="header__navigation">
            <ul className="header__list">
              {categorys.map(res => (
                <li className="header__item" key={res.id}>
                  <a onClick={() => this.loadCategoryData(res.id)}>
                    {res.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <SubCategorys subCategorys={subCategorys} />
      </>
    );
  }
}

export default Category;
