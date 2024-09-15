import React, { Component } from 'react';
import { Layout, Result, Tabs, Input } from 'antd';
import './App.css';
import ListItems from './components/List/ListItems.jsx';
import MovieService from './services/movie-service.js';
import { Offline, Online } from 'react-detect-offline';
import { FrownOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { GenresContextProvider } from './services/genresContext.jsx';

export default class App extends Component {
  movies = new MovieService();

  state = {
    error: false,
    search: true,
  };

  getMoviesList = (movieName, page = 1) => {
    this.movies
      .getMovies(movieName, page)
      .then((response) => {
        this.setState({
          error: false,
          pages: response.total_results,
          list: response.results,
          loading: false,
          value: movieName,
          search: true,
        });
      })
      .catch(this.onError);
  };

  getRatedList = (sessionId, page = 1) => {
    this.movies
      .getRatedMovies(sessionId, page)
      .then((response) => {
        this.setState({
          error: false,
          ratedPages: response.total_results,
          ratedList: response.results,
          loading: false,
          search: false,
        });
      })
      .catch(this.onError);
  };

  addMovieRating = (sessionId, movieId, rating) => {
    this.movies.addRating(sessionId, movieId, rating).catch(this.onError);
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  handleInput = (e) => {
    this.setState({ loading: true });
    this.getMoviesList(e.target.value);
  };
  componentDidCatch() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  componentDidMount() {
    // сессия обновляется каждые 60 минут.
    if (
      window.localStorage.getItem('sessionTime') &&
      Date.now() - Number(window.localStorage.getItem('sessionTime')) > 3600000
    ) {
      this.movies.createGuestSession().then((response) => {
        window.localStorage.setItem('sessionId', response.guest_session_id);
        this.setState({ sessionId: response.guest_session_id });
        window.localStorage.setItem('sessionTime', Date.now());
      });
    }

    if (!window.localStorage.getItem('sessionId')) {
      this.movies.createGuestSession().then((response) => {
        window.localStorage.setItem('sessionId', response.guest_session_id);
        this.setState({ sessionId: response.guest_session_id });
        window.localStorage.setItem('sessionTime', Date.now());
      });
    }
    if (!this.state.sessionId) {
      this.setState({ sessionId: window.localStorage.getItem('sessionId') });
    }
  }

  render() {
    const { list, loading, error, pages, value, sessionId, ratedList, ratedPages } = this.state;

    const listItem = (
      <React.Fragment>
        <ListItems
          moviesList={list}
          loading={loading}
          pages={pages}
          value={value}
          sessionId={sessionId}
          error={error}
          addMovieRating={this.addMovieRating}
          getMoviesList={this.getMoviesList}
        />
      </React.Fragment>
    );

    const debounced = debounce(this.handleInput, 1000, { maxWait: 2000 });

    const searchPage = (
      <React.Fragment>
        <Input
          onChange={(e) => debounced(e)}
          placeholder="Type to search..."
          style={{ width: '93%', margin: '10px auto 25px', height: '40px' }}
        />
        {listItem}
      </React.Fragment>
    );

    const ratedPage = (
      <React.Fragment>
        <ListItems
          moviesList={ratedList}
          loading={loading}
          error={error}
          sessionId={sessionId}
          pages={ratedPages}
          getRatedList={this.getRatedList}
        />
      </React.Fragment>
    );

    const tabs = [
      {
        key: '1',
        label: 'Search',
        icon: <SearchOutlined />,
        children: searchPage,
      },
      {
        key: '2',
        label: 'Rated',
        icon: <StarOutlined />,
        children: ratedPage,
      },
    ];
    return (
      <>
        <Online>
          <GenresContextProvider value={this.movies}>
            <Layout style={{ backgroundColor: 'white' }}>
              <Tabs
                onTabClick={(key) => {
                  if (key == 2) {
                    this.getRatedList(sessionId, 1);
                  }
                }}
                defaultActiveKey="1"
                items={tabs}
                size="large"
                centered
                indicator={{ size: (origin) => origin + 20, align: 'center' }}
              />
            </Layout>
          </GenresContextProvider>
        </Online>
        <Offline>
          <Result
            icon={<FrownOutlined />}
            status="error"
            subTitle="Check your connection and try again. "
            title="You're are offline."
          />
        </Offline>
      </>
    );
  }
}
