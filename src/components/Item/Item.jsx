import { Component } from 'react';
import { Card, Image, Flex, Typography, Tag, Progress, Rate, ConfigProvider} from 'antd';

import * as item from './styles';
import { format } from "date-fns";

const { Paragraph, Title, Text} = Typography;

const posterDefault = 'https://watchmovies123.cyou/images/noposter.jpg'




export default class Item extends Component {

    cropOverview(text,title) {
        if(title.length > 57 && text.length > 70) {
            return `${text.slice(0,70).split(' ').slice(0,-1).join(' ')}...`
        }

        if(title.length > 40 && text.length > 120) {
            return `${text.slice(0,120).split(' ').slice(0,-1).join(' ')}...`
        }

        if(text.length > 170 ) {
            return `${text.slice(0,160).split(' ').slice(0,-1).join(' ')}...`
        }
        
        return text
    }



    render() {
        const { overview, title, release_date = '', poster_path, vote_average} = this.props

        const poster = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : posterDefault;

        const overviewInfo = this.cropOverview(overview,title);

        const rating = vote_average ? vote_average.toFixed(1) : 0;

        let date = null;

        date = release_date.length ? format(new Date(release_date), 'PP') : 'not found'
        
        
        return (
            <Card 
                style={item.cardStyle}
                styles={{body:{padding:0,overflow:'hidden'}}}>
                <ConfigProvider theme={{components:{Progress:{circleTextFontSize: 17}}}}>
                <Flex justify='flex-start' gap='middle'>
                    <Image src={poster} style={item.imageStyle}/>
                    <Flex vertical>
                        <Flex justify='space-between' style={{width: '244px'}}>
                        <Title level={2} style={item.titleStyle}>{title}</Title>
                        <Progress 
                            type='circle' 
                            size={40} 
                            percent={rating} 
                            strokeColor='rgba(233, 209, 0, 1)' 
                            format={(percent) => `${percent}`}
                            style={item.progressStyle}
                            trailColor="rgba(233, 209, 0, 1)"
                            
                        ></Progress>
                        </Flex>
                        <Text type="secondary" style={item.textStyle}>{date} </Text>
                            <Flex gap="small">
                                <Tag style={item.tagStyle}>Action</Tag>
                                <Tag style={item.tagStyle}>Drama</Tag>
                            </Flex>
                        
                        <Paragraph style={item.paragraphStyle}>{overviewInfo}</Paragraph>
                        <Rate
                            style={{fontSize: '17px', position: 'absolute', bottom: '5px'}}
                            disabled 
                            defaultValue={0} 
                            value={rating}
                            count={10} 
                            allowHalf
                            />
                    </Flex>
                </Flex>
                </ConfigProvider>
            </Card>
        )
    }
}