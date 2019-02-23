import React, { Component } from "react";
import API from "../../utils/api";
import "./Categories.css";
import DataContext from "../../Contexts/Context";
class Categories extends Component {
  state = {
    active: null,
    categoriesItem: []
  };

  handleCategories = data => {
    this.setState(() => ({
      categoriesItem: [
        ...data.map(result => ({
          id: result.id,
          name: result.name
        }))
      ]
    }));
  };

  componentDidMount() {
    API.getCategories().then(this.handleCategories);
  }

  static contextType = DataContext;

  handleClick = IdCategory => {
    this.context.getIdCategory(IdCategory);
    this.setState({ active: IdCategory });
  };

  render() {
    const { active, categoriesItem } = this.state;
    return (
      <>
        <header className="header">
          <nav className="header__navigation">
            <ul className="header__list">
              {categoriesItem.map(res => (
                <li className="header__item" key={res.id}>
                  <button
                    type="button"
                    className={
                      active === res.id ? "button-active" : "link-button"
                    }
                    onClick={() => this.handleClick(res.id)}
                  >
                    {res.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export default Categories;
