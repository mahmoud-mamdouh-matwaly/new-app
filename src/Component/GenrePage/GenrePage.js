import React from "react";
import CardItem from "../CardItem/CardItem";

import "./GenrePage.css";

const GenrePage = props => (
  <section className="card">
    {props.cards.map(card => (
      <CardItem
        key={card.title}
        cardTitle={card.title}
        cardurl={card.url}
        cardImg={card.img}
      />
    ))}
  </section>
);

export default GenrePage;
