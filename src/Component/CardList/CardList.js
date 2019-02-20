import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CardList.css";
class CardList extends Component {
  static propTypes = {
    cardurl: PropTypes.string,
    cardTitle: PropTypes.string,
    cardImg: PropTypes.string
  };

  render() {
    const { cardurl, cardTitle, cardImg } = this.props;
    return (
      <>
        <div className="card__list">
          <a href={cardurl}>
            <h1 className="card__title">{cardTitle}</h1>
            <div className="card__image">
              <img src={cardImg} alt="" />
            </div>
          </a>
          <div className="card__action">
            <ul className="card__iconlist">
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-heart" />
                  <span>save</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-share-alt" />
                  <span>share</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default CardList;
