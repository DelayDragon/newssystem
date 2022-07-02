import React,{forwardRef,useEffect,useState} from 'react'
import {Form,Select,Input} from 'antd'

const  UserForm=forwardRef((props,ref)=> {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isDisabled,setisDisabled] = useState(false)

    useEffect(()=>{
        setisDisabled(props.isUpdateDisabled)
    },[props.isUpdateDisabled])

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
          rules={isDisabled?[]:[
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
              props.regionList.map(item=>{
                return <Option value={item.value} key={item.id}>{item.label}</Option>
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
            onChange={(value)=>{
                if(value===1){
                    setisDisabled(true)
                    ref.current.setFieldsValue({
                        region:''
                    })
                }else{
                    setisDisabled(false)
                }
            }}
            style={{
              width: 472,
            }}
          >
            {
              props.roleList.map(item=>{
                return <Option value={item.id} key={item.id}>{item.roleName}</Option>
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
})

export default UserForm