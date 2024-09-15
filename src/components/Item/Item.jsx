import { Component } from 'react';
import { Card, Image, Flex, Typography, Progress, Rate, ConfigProvider } from 'antd';
import * as item from './styles';
import { format } from 'date-fns';
import { Genres } from '../../services/genresContext';
import PropTypes from 'prop-types';
import posterDefault from '../../images/noposter.jpg';

const { Paragraph, Title, Text } = Typography;

export default class Item extends Component {
  cropOverview(text, title, genresNumber) {
    if (title.length > 57 && genresNumber > 3) {
      return `${text.slice(0, 40).split(' ').slice(0, -1).join(' ')}...`;
    }
    if (genresNumber > 3 && title.length > 20) {
      return `${text.slice(0, 110).split(' ').slice(0, -1).join(' ')}...`;
    }
    if (genresNumber > 3 && title.length > 40) {
      return `${text.slice(0, 140).split(' ').slice(0, -1).join(' ')}...`;
    }
    if (title.length > 57 && text.length > 70) {
      return `${text.slice(0, 70).split(' ').slice(0, -1).join(' ')}...`;
    }

    if (title.length > 40 && text.length > 120) {
      return `${text.slice(0, 120).split(' ').slice(0, -1).join(' ')}...`;
    }

    if (text.length > 170) {
      return `${text.slice(0, 160).split(' ').slice(0, -1).join(' ')}...`;
    }

    return text;
  }
  getRatingColor = (ratingNumber) => {
    if (3 > Number(ratingNumber) && Number(ratingNumber) >= 0) {
      return '#E90000';
    }
    if (5 > Number(ratingNumber) && Number(ratingNumber) >= 3) {
      return '#E97E00';
    }
    if (7 >= Number(ratingNumber) && Number(ratingNumber) >= 5) {
      return '#E9D100';
    }
    if (Number(ratingNumber) > 7) {
      return '#66E900';
    }
  };

  render() {
    const {
      overview,
      title,
      release_date = '',
      poster_path,
      vote_average,
      movieId,
      sessionId,
      rating,
      addMovieRating,
      genre_ids,
    } = this.props;

    const poster = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : posterDefault;

    const overviewInfo = this.cropOverview(overview, title, genre_ids.length);

    const ratingFix = vote_average ? vote_average.toFixed(1) : 0;

    let date = null;

    date = release_date.length ? format(new Date(release_date), 'PP') : 'not found';

    return (
      <Card style={item.cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
        <ConfigProvider theme={{ components: { Progress: { circleTextFontSize: 17 } } }}>
          <Flex justify="flex-start" gap="middle">
            <Image src={poster} style={item.imageStyle} />
            <Flex vertical>
              <Flex justify="space-between" style={{ width: '244px' }}>
                <Title level={2} style={item.titleStyle}>
                  {title}
                </Title>
                <Progress
                  type="circle"
                  size={40}
                  percent={ratingFix}
                  strokeColor={this.getRatingColor(ratingFix)}
                  format={(percent) => `${percent}`}
                  style={item.progressStyle}
                  trailColor={this.getRatingColor(ratingFix)}
                ></Progress>
              </Flex>
              <Text type="secondary" style={item.textStyle}>
                {date}{' '}
              </Text>
              <Flex wrap>
                <Genres ids={genre_ids} />
              </Flex>

              <Paragraph style={item.paragraphStyle}>{overviewInfo}</Paragraph>
              {rating ? (
                <Rate
                  style={{ fontSize: '17px', position: 'absolute', bottom: '5px' }}
                  defaultValue={rating}
                  disabled
                  count={10}
                  allowHalf
                />
              ) : (
                <Rate
                  style={{ fontSize: '17px', position: 'absolute', bottom: '5px' }}
                  defaultValue={0}
                  count={10}
                  allowHalf
                  onChange={(value) => {
                    addMovieRating(sessionId, movieId, value);
                  }}
                />
              )}
            </Flex>
          </Flex>
        </ConfigProvider>
      </Card>
    );
  }
}

Item.propTypes = {
  overview: PropTypes.string,
  title: PropTypes.string,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  movieId: PropTypes.number,
  sessionId: PropTypes.string,
  rating: PropTypes.number,
  addMovieRating: PropTypes.func,
  genre_ids: PropTypes.array,
};
