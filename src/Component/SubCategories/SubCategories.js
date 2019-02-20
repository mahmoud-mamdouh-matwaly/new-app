import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../../utils/api";
import GenrePage from "../GenrePage/GenrePage";
import Spinner from "../spinner/spinner";
import "./SubCategories.css";
class SubCategories extends Component {
  static propTypes = {
    subCategories: PropTypes.array
  };
  static defaultProps = {
    subCategories: []
  };
  state = {
    cards: [],
    active: null
  };

  loadingData = slug => {
    API.getData(slug).then(data => {
      this.setState(state => ({
        active: slug,
        cards: [
          ...data.articles.map(result => ({
            title: result.title,
            url: result.url,
            img: result.urlToImage
          }))
        ]
      }));
    });
  };

  componentDidMount() {
    this.loadingData();
  }
  render() {
    const { subCategories } = this.props;
    const { cards, loading, active } = this.state;
    return (
      <>
        <nav className="header__subnavigation">
          <ul className="header__sublist">
            {subCategories.map(res => (
              <li className="header__subitem" key={res.id}>
                <button
                  type="button"
                  className={
                    active === res.slug ? "button-active" : "link-button"
                  }
                  onClick={() => this.loadingData(res.slug)}
                >
                  {res.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {loading && cards.length === 0 ? (
          <Spinner />
        ) : (
          <GenrePage cards={cards} />
        )}
      </>
    );
  }
}

export default SubCategories;
