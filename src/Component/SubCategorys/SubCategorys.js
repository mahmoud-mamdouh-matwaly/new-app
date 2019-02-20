import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../../utils/api";
import GenrePage from "../GenrePage/GenrePage";
import Spinner from "../spinner/spinner";
import "./SubCategorys.css";
class SubCategorys extends Component {
  static propTypes = {
    subCategorys: PropTypes.array
  };
  static defaultProps = {
    subCategorys: []
  };
  state = {
    cards: []
  };
  loadingData = slug => {
    console.log(slug);
    API.getData(slug).then(data => {
      this.setState(state => ({
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
    const { subCategorys } = this.props;
    const { cards, loading } = this.state;
    return (
      <>
        <nav className="header__subnavigation">
          <ul className="header__sublist">
            {subCategorys.map(res => (
              <li className="header__subitem" key={res.id}>
                <a onClick={() => this.loadingData(res.slug)}>{res.title}</a>
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

export default SubCategorys;
