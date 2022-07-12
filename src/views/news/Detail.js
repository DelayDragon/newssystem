import React, { useEffect, useState } from 'react'
import { Descriptions, PageHeader } from 'antd';
import { useMatch } from 'react-router-dom';
import {HeartTwoTone} from '@ant-design/icons'
import moment from 'moment'
import axios from 'axios';

export default function Detail() {
    const match = useMatch('/detail/:id')
    const [newsInfo, setnewsInfo] = useState(null)
    useEffect(() => {
        console.log(Date());
        axios.get(`/news/${match.params.id}?_expand=category&_expand=role`).then(res => {
            console.log(res.data)
            setnewsInfo({
                ...res.data,
                view:res.data.view+1
            })
            return res.data
        }).then(res=>{
            axios.patch(`/news/${match.params.id}`,{
                view:res.view+1
            })
        })
    }, [match.params.id])
    const handleStar=()=>{
        setnewsInfo({
            ...newsInfo,
            star:newsInfo.star+1
        })
        axios.patch(`/news/${match.params.id}`,{
            star:newsInfo.star+1
        })
    }
    return (
        <div>
            {
                newsInfo && <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.label}
                        subTitle={<div>
                            {newsInfo.category.label}
                            <span>{` `}</span>
                            <HeartTwoTone twoToneColor="#eb2f96" onClick={()=>{handleStar()}}/>
                        </div>}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.createTime).format('YYYY/MM/DD HH:mm:ss') : <span style={{ color: 'red' }}>-</span>}</Descriptions.Item>
                            <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="访问数量"><span style={{ color: 'green' }}>{newsInfo.view}</span></Descriptions.Item>
                            <Descriptions.Item label="点赞数量"><span style={{ color: 'green' }}>{newsInfo.star}</span></Descriptions.Item>
                            <Descriptions.Item label="评论数量"><span style={{ color: 'green' }}>0</span></Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <div dangerouslySetInnerHTML={{__html:newsInfo.content}} style={{padding:'24px',border:'1px solid gray'}}></div>
                </div>
            }
        </div>
    )   
}
