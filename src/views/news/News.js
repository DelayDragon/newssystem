import axios from 'axios'
import { PageHeader, Row, Col, Card, List } from 'antd';
import React, { useEffect } from 'react'
import _ from 'lodash'
import { useState } from 'react';

export default function News() {
    const [list, setlist] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/news?publishState=2&_expand=category').then(res => {
            console.log(Object.entries(_.groupBy(res.data, item => item.category.label)));
            setlist(Object.entries(_.groupBy(res.data, item => item.category.label)));
        })
    }, [])
    return (
        <div style={{ width: '95%', margin: '0 auto' }}>
            <PageHeader
                className="site-page-header"
                title="全球新闻"
                subTitle="新闻详情"
            />
            <div className="site-card-wrapper">
                <Row gutter={[16, 16]}>
                    {
                        list.map(item =>
                            <Col span={8} key={item[0]}> 
                                <Card title={item[0]} bordered={true} hoverable={true} >
                                    <List
                                        bordered
                                        pagination={
                                            { pageSize: 3 }
                                        }
                                        dataSource={item[1]}
                                        renderItem={(date) => (
                                            <List.Item>
                                                <a href={`/detail/${date.id}`}>{date.label}</a>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>)
                    }

                </Row>
            </div>
        </div>
    )
}
