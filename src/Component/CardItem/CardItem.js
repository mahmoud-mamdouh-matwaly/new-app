import React from "react";
import "./CardItem.css";

const CardItem = props => (
  <div className="card__item">
    <a href={props.cardurl}>
      <h1 className="card__title">{props.cardTitle}</h1>
      <div className="card__image">
        <img src={props.cardImg} alt="" />
      </div>
    </a>
    <div className="card__action">
      <ul className="card__iconItem">
        <li>
          <button type="button" className="link-button">
            <i className="fa fa-heart" />
            <span>save</span>
          </button>
        </li>
        <li>
          <button type="button" className="link-button">
            <i className="fa fa-share-alt" />
            <span>share</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
);

export default CardItem;
