import React, { Component } from "react";
import CardItem from "../CardItem/CardItem";
import API from "../../utils/api";
import DataContext from "../../Contexts/Context";
import "./GenrePage.css";

class GenrePage extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      cards: [],
      active: null,
      page: 1,
      slug: "general"
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadingCardData,
        state: { error, isLoading, hasMore }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadingCardData();
      }
    };
  }

  loadingCardData = () => {
    const { slugName } = this.props;

    if (slugName !== this.state.slug) {
      this.setState({ page: 1, cards: [], slug: slugName, hasMore: true });
    }

    this.setState({ isLoading: true }, () => {
      API.getCardData(slugName || this.state.slug, this.state.page)
        .then(data => {
          this.setState(state => ({
            active: slugName,
            slug: this.state.slug,
            hasMore: data.articles.length !== 0,
            isLoading: false,
            page: state.page + 1,
            cards: [
              ...state.cards,
              ...data.articles.map(result => ({
                title: result.title,
                url: result.url,
                img: result.urlToImage
              }))
            ]
          }));
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  static contextType = DataContext;

  componentDidMount() {
    this.loadingCardData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slugName !== this.props.slugName) {
      this.loadingCardData();
    }
  }

  render() {
    const { cards, isLoading, error, hasMore } = this.state;
    return (
      <>
        <section className="card">
          {cards.map(card => (
            <CardItem
              key={card.title}
              cardTitle={card.title}
              cardurl={card.url}
              cardImg={card.img}
            />
          ))}
        </section>

        {error && (
          <div style={{ color: "#900", textAlign: "center" }}>{error}</div>
        )}
        {isLoading && (
          <div style={{ color: "#900", textAlign: "center" }}>Loading...</div>
        )}
        {!hasMore && (
          <div style={{ color: "#900", textAlign: "center" }}>
            You did it! You reached the end!
          </div>
        )}
      </>
    );
  }
}

export default GenrePage;
