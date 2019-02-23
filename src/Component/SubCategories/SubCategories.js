import React, { Component } from "react";
import API from "../../utils/api";
import DataContext from "../../Contexts/Context";
import "./SubCategories.css";

class SubCategories extends Component {
  state = {
    subCategories: [],
    active: null
  };
  static contextType = DataContext;

  handleClick = slugName => {
    this.context.getSlugName(slugName);
    this.setState({ active: slugName });
  };

  loadSubCategoryData = () => {
    const { IdCategory } = this.props;
    if (IdCategory) {
      API.getSubCategories(IdCategory).then(data => {
        this.setState({
          active: IdCategory,
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

  componentDidUpdate(prevProps) {
    if (prevProps.IdCategory !== this.props.IdCategory) {
      this.loadSubCategoryData();
    }
  }

  render() {
    const { subCategories, active } = this.state;
    return (
      <nav className="header__subnavigation">
        <ul className="header__sublist">
          {subCategories.map(res => (
            <li className="header__subitem" key={res.id}>
              <button
                type="button"
                className={
                  active === res.slug ? "button-active" : "link-button"
                }
                onClick={() => this.handleClick(res.slug)}
              >
                {res.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default SubCategories;
