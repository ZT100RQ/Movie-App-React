import {  Layout, Pagination, Spin, Result, Tabs, Input} from 'antd';
import { Component } from 'react';
import './App.css';
import ListItems from './components/List/ListItems.jsx';
import MovieService from './services/movie-service.js';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { Offline, Online } from 'react-detect-offline';
import { FrownOutlined, SearchOutlined, StarOutlined} from '@ant-design/icons';
import debounce from 'lodash.debounce';



export default class App extends Component {

  movies = new MovieService();

 
  state = {
    error: false,
    pages: 1,
    list : [],
    loading: true
  }


  getMoviesList = (name,page = 1) => {
    this.movies.getMovies(name,page)
    .then((response) => {
      this.setState({ 
        error: false,
        pages: response.total_results,
        list: response.results, 
        loading: false,
        value: name
      });
    })
    .catch(this.onError)
    
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }
  
  handleInput = (e) => {
    this.getMoviesList(e.target.value);
  }
  

  render() {
    const { list , loading, error, pages, value} = this.state
    

    const errorComponent = <Result status="error" title="Houston, we have a problem"/>
    const listItem = <React.Fragment>
                        <ListItems moviesList={list} loading={loading} pages={pages} value={value} getMoviesList={this.getMoviesList}/>
                      </React.Fragment>
    
    const hasData = !(loading || error)

    const errorMessage = error ?  errorComponent : null;
    // const spinner = loading ? <Spin indicator={<LoadingOutlined style={{fontSize: 120,}} spin/>}/> : null;
    const content = hasData ? listItem : null;

    const debounced = debounce(this.handleInput,1000,{maxWait:2000})
    const tabs = [
      {
        key:'1',
        label: 'Search',
        icon: <SearchOutlined />
      },
      {
        key:'2',
        label: 'Rated',
        icon: <StarOutlined />
      }
    ]

    // console.log(list)
    

     return (
      <>
        <Online>
          <Layout 
            style={{backgroundColor:'white'}}>
          <Tabs
            
            defaultActiveKey="1" 
            items={tabs} 
            size="large"  
            centered 
            indicator={{size: (origin) => origin + 20, align: 'center'}}
          />
          <Input 
            onChange={(e) => debounced(e)} 
            placeholder='Type to search...' 
            style={{width:'93%', margin: '10px auto 25px', height: '40px', }}
          />
            {errorMessage}
            {/* {spinner} */}
            {content}
          </Layout>
        </Online>
        <Offline>
          <Result 
            icon={<FrownOutlined/>}
            status="error" 
            subTitle="Check your connection and try again. "
            title="You're are offline."/>
        </Offline>
      </>
    )
  }
}


