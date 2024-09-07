import { List, Flex, Empty, Pagination,Spin} from 'antd';
import Item from "../Item/Item";
import { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export default class ListItem extends Component {

    
render() {
   
    const { moviesList, pages, value, getMoviesList} = this.props

    const testList = moviesList.map(item => {
        const { id, ...itemProps} = item;
        return (
            <Item 
                key={id}
                {...itemProps}
            />
        );
    })

    

    if(!testList.length) {
        return <Empty description='Empty'/>
    }

    
  
  
   

    return (
        <List style={{marginBottom: "20px"}}>
         <Flex 
                justify='center'
                wrap
                gap="36px">
                    
                {testList}
            </Flex>
            <Pagination 
                align="center" 
                onChange={(page) => {
                    getMoviesList(value,page)
                }} 
                showSizeChanger={false} 
                pageSize={20} 
                defaultCurrent={1}
                total={pages} 
                style={{marginTop:'15px'}} />
        </List> 
    )
}    
}
