import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../../utils/api";
import GenrePage from "../GenrePage/GenrePage";
import Spinner from "../spinner/spinner";
import "./SubCategories.css";

class SubCategories extends Component {
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

  static propTypes = {
    subCategories: PropTypes.array
  };
  static defaultProps = {
    subCategories: []
  };

  loadingCardData = (slugName = this.state.slug) => {
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

  componentDidMount() {
    this.loadingCardData();
  }

  render() {
    const { subCategories } = this.props;
    const { cards, isLoading, active, error, hasMore } = this.state;
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
                  onClick={() => this.loadingCardData(res.slug)}
                >
                  {res.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {isLoading && cards.length === 0 ? (
          <Spinner />
        ) : (
          <GenrePage cards={cards} />
        )}
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

export default SubCategories;
