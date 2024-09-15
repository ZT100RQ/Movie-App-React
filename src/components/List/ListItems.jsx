import { List, Flex, Empty, Pagination, Spin, Result } from 'antd';
import Item from '../Item/Item';
import { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
  render() {
    const { moviesList, pages, value, getMoviesList, loading, error, sessionId, getRatedList, addMovieRating } =
      this.props;
    if (!moviesList) {
      return <Empty description={false} />;
    }

    const moviesArray = moviesList.map((item) => {
      const { id, ...itemProps } = item;
      return <Item key={id} movieId={id} sessionId={sessionId} addMovieRating={addMovieRating} {...itemProps} />;
    });

    const errorComponent = <Result status="error" title="Houston, we have a problem" />;

    const hasData = !(loading || error);

    const content = hasData ? moviesArray : null;

    const errorMessage = error ? errorComponent : null;

    if (!moviesArray.length) {
      return <Empty description={`Movie ${value} not found`} style={{ fontSize: '25px' }} />;
    }

    const spinner = loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 120 }} spin />} /> : null;

    return (
      <List style={{ marginBottom: '20px' }}>
        <Flex justify="center" wrap gap="36px">
          {errorMessage}
          {spinner}
          {content}
        </Flex>
        {loading ? null : (
          <Pagination
            align="center"
            onChange={(page) => {
              getMoviesList ? getMoviesList(value, page) : getRatedList(sessionId, page);
            }}
            showSizeChanger={false}
            pageSize={20}
            defaultCurrent={1}
            total={pages}
            style={{ marginTop: '15px' }}
          />
        )}
      </List>
    );
  }
}

ListItem.propTypes = {
  moviesList: PropTypes.array,
  pages: PropTypes.number,
  value: PropTypes.string,
  getMoviesList: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  sessionId: PropTypes.string,
  getRatedList: PropTypes.func,
  addMovieRating: PropTypes.func,
};
