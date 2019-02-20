import React, { Component } from "react";
import CardList from "../CardList/CardList";
import PropTypes from "prop-types";

import "./GenrePage.css";

class GenrePage extends Component {
  static propTypes = {
    cards: PropTypes.array
  };

  static defaultProps = {
    cards: []
  };

  render() {
    const { cards } = this.props;
    return (
      <>
        <div className="card">
          {cards.map(card => (
            <CardList
              key={card.title}
              cardTitle={card.title}
              cardurl={card.url}
              cardImg={card.img}
            />
          ))}
        </div>
      </>
    );
  }
}

export default GenrePage;
