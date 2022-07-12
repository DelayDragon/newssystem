import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import * as ECharts from 'echarts'
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import _ from 'lodash'
import axios from 'axios';

export default function Home() {
  const [viewList, setviewList] = useState([])
  const [starList, setstarList] = useState([])
  const [allList, setallList] = useState([])
  const [pieChart, setpieChart] = useState(null)
  const [visible, setvisible] = useState(false)
  const barRef = useRef()
  const pieRef = useRef()
  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'))
  const { Meta } = Card;
  // 新闻浏览排序
  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(res => {
      console.log(res.data);
      setviewList(res.data)
    })
  }, [])
  // 新闻点赞排序
  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res => {
      console.log(res.data);
      setstarList(res.data)
    })
  }, [])
  // 树状图
  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category').then(res => {
      renderBarView(_.groupBy(res.data, item => item.category.label))
      setallList(res.data)
    })
    return () => {
      window.onresize = null
    }
  }, [])
  // 渲染树状图
  const renderBarView = (obj) => {
    var myChart = ECharts.init(barRef.current);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类展示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          // rotate:'45'
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item => item.length)
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = () => {
      myChart.resize()
    }
  }
  // 渲染饼状图
  const renderPieView = (obj) => {
    var currentList = allList.filter(item => item.author === username)
    console.log(currentList);
    var groupObj = _.groupBy(currentList, item => item.category.label)

    var list = []
    for (var i in groupObj) {
      list.push({
        name: i,
        value: groupObj[i].length,
      })
    }
    console.log(list);

    var myChart;
    if (!pieChart) {
      myChart = ECharts.init(pieRef.current);
      setpieChart(myChart)
    } else {
      myChart = pieChart
    }
    var option;

    option = {
      title: {
        text: '当前用户新闻分类图示',
        subtext: 'Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);

  }

  // const ajax = () => {
  //获取数据
  // axios.get('http://localhost:8000/posts').then(res=>{
  //   console.log(res.data);
  // })

  //增加数据
  // axios.post('http://localhost:8000/posts',{
  //   titel:'3333',
  //   author:'xiaoming'
  // })

  // 修改数据
  // (1)没修改的数据会被丢弃
  // axios.put('http://localhost:8000/posts/1',{
  //   title:'11-修改',
  // })
  // (2)局部修改
  // axios.patch('http://localhost:8000/posts/1',{
  //   title:'112-修改'
  // })

  // 删除数据
  // axios.delete('http://localhost:8000/posts/1')

  // _embed   获取新闻连同对应评论
  // axios.get('http://localhost:8000/posts?_embed=comments').then(res=>{
  //   console.log(res.data);
  // })

  //_expand   获取评论连同对应新闻
  // axios.get('http://localhost:8000/comments?_expand=post').then(res=>{
  //   console.log(res.data);
  // })
  // _sort   排序
  // _order=desc   倒序排序

  // }
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true} hoverable={true}>
            <List
              bordered
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`/newssendbox/news-manage/preview/${item.id}`}>{item.label}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true} hoverable={true}>
            <List
              bordered
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`/newssendbox/news-manage/preview/${item.id}`}>{item.label}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable={true}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={() => {
                setvisible(true)
                setTimeout(() => {
                  renderPieView()
                }, 0);
              }} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={
                <div>
                  <b>{region ? region : '全球'}</b>
                  <span style={{ paddingLeft: '30px' }}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer title="个人新闻分类" placement="right" onClose={() => setvisible(false)} visible={visible} width='500px'>
        <div ref={pieRef} style={{
          height: '400px',
          // width:'1180px',
          marginTop: '30px',
        }}></div>
      </Drawer>
      <div ref={barRef} style={{
        height: '400px',
        width: '1180px',
        marginTop: '30px',
        border: '1px solid grey'
      }}></div>
    </div>
  )
}
