import axios from 'axios'
import React, { useEffect, useState,useRef,useContext } from 'react'
import { Button, Table,Modal,Form,Input } from 'antd'
import {DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

export default function NewsCategory() {
  const EditableContext = React.createContext(null);
  const {confirm} = Modal
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/categories').then(res=>{
      setdataSource(res.data)
    })
  },[])

  const deleleMethod=(item)=>{ 
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:5000/categories/${item.id}`)
  }
  const confirmDelete=(item)=>{
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
  
      onOk() {
        console.log('OK',item);
        deleleMethod(item)
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '栏目名称',
      dataIndex: 'label',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'label',
        title: '栏目名称',
        handleSave:handleSave,
      }),
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
              <Button danger shape="circle" icon={<DeleteOutlined />}  onClick={()=>{confirmDelete(item)}}/>
        </div>
      }
    },
  ]
  const handleSave = (record)=>{
    console.log(record);
    setdataSource(dataSource.map(item=>{
      if(item.id===record.id){
        return{
          id:item.id,
          label:record.label,
          value:record.label
        }
      }
      return item
    }))

    axios.patch(`http://localhost:5000/categories/${record.id}`,{
      label:record.label,
      value:record.label
    })
  }

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 6 }} rowKey={item => item.id} 
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell,
        }}
      }/>
    </div>
  )
}
