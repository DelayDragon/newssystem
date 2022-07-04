import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Select, Input } from 'antd'

const UserForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isDisabled, setisDisabled] = useState(false)
  const { roleId, region,role:{roleName} } = JSON.parse(localStorage.getItem('token'))
  const roleObj = {
    "1": 'superadmin',
    "2": 'admin',
    "3": 'editor'
  }
  useEffect(() => {
    setisDisabled(props.isUpdateDisabled)
  }, [props.isUpdateDisabled])
  //根据登录用户限制角色可选
  const checkRoleDisabled = (item) => {
    //点击的是更新
    if (props.isControl === 'update') {
      //根据登录用户权限展示
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return true
      }
    }
    //点击的添加
     else if (props.isControl === 'add') {
      //根据登录用户权限展示
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return roleObj[item.id]!=='editor'
      }
    }
  }
  //根据登录用户限制区域可选
  const checkRegionDisabled = (item) => {
    if (props.isControl === 'update') {
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return true
      }
    } else if (props.isControl === 'add') {
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return item.value !== region
      }
    }
  }
  return (
    <div>
      <Form
        ref={ref}
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        {/* 用户名 */}
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: 'Please input the username of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* 密码 */}
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: 'Please input the password of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* 区域 */}
        <Form.Item
          name="region"
          label="区域"
          rules={isDisabled ? [] : [
            {
              required: true,
              message: 'Please input the region of collection!',
            },
          ]}
        >
          <Select
            disabled={isDisabled}
            style={{
              width: 472,
            }}
          >
            {
              props.regionList.map(item => {
                return <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.label}</Option>
              })
            }
          </Select>

        </Form.Item>
        {/* 角色 */}
        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: 'Please input the role of collection!',
            },
          ]}
        >
          <Select
            onChange={(value) => {
              if (value === 1) {
                setisDisabled(true)
                ref.current.setFieldsValue({
                  region: ''
                })
              } else {
                setisDisabled(false)
              }
            }}
            style={{
              width: 472,
            }}
          >
            {
              props.roleList.map(item => {
                return <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
})

export default UserForm