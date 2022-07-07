import React, { useEffect, useState } from 'react'
import { Descriptions, PageHeader } from 'antd';
import { useMatch } from 'react-router-dom';
import moment from 'moment'
import axios from 'axios';

export default function NewsPreview() {
    const match = useMatch('/newssendbox/news-manage/preview/:id')
    const [newsInfo, setnewsInfo] = useState(null)
    const auditList = ["未审核", "审核中", "已通过", "未通过"]
    const publishList = ["未发布", "待发布", "已上线", "已下线"]
    useEffect(() => {
        console.log(Date());
        axios.get(`http://localhost:5000/news/${match.params.id}?_expand=category&_expand=role`).then(res => {
            console.log(res.data)
            setnewsInfo(res.data)
        })
    }, [match.params.id])
    return (
        <div>
            {
                newsInfo && <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={newsInfo.category.label}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format('YYYY/MM/DD HH:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.createTime).format('YYYY/MM/DD HH:mm:ss') : <span style={{ color: 'red' }}>-</span>}</Descriptions.Item>
                            <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="审核状态"><span style={{ color: 'red' }}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
                            <Descriptions.Item label="发布状态"><span style={{ color: 'red' }}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
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
