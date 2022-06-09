import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, Input } from 'antd';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import './style.scss';
import LogServices from '../../../db/services/log_system.services';
import ILog from '../../../db/types/log_system.type';
import moment from "moment-timezone";
type Props = {};

const columns = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'tenDangNhap',
    width: '25%',
  },
  {
    title: 'Thời gian tác động',
    dataIndex: 'actionTime',
    width: '20%',
    render: (actionTime:any)=>{
     return <span>{moment(actionTime.toDate()).tz("Asia/Ho_Chi_Minh").format('DD/MM/YYYY HH:mm:ss')}</span>
    }
  },
  {
    title: 'IP thực hiện',
    dataIndex: 'ip',
    width: '20%',
  },
  {
    title: 'Thao tác thực hiện',
    dataIndex: 'action',
    width: '35%',
  },
];
const UserLog = (props: Props) => {
  const [logs, setLogs]= useState<ILog[]>([])
  const [key, setKey]= useState('')

  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [time, setTime] = useState({
    startDay: moment(),
    endDay: moment().add(7,'days')
  })
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  });
  
  useEffect(() => {
    (async()=>{
    let data = await LogServices.getLogs()
    data = data.map((item)=>{
      return {
        ...item,
        key: item.id
      }
    })
    setLogs(data)
    setTable({ ...table, data: data as any });
    })()
  }, []);
  
  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  const xoa_dau = (str:string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}
  const handleKeyWordChange  = (e: React.FormEvent<HTMLInputElement>)=>{
    let value= e.currentTarget.value
    setKey(value)
    if(searchRef){
      clearInterval(searchRef.current as any)
    }
    searchRef.current = setTimeout(() => {
     let temp = logs.filter((log)=>{
      let temp = log.actionTime as any
      return  (moment(temp.toDate()) >= time.startDay && moment(temp.toDate()) <= time.endDay) || (moment(temp.toDate()).isSame(time.endDay,'day') || moment(temp.toDate()).isSame(time.startDay,'day'))
    }).filter(item=>
      xoa_dau(item.tenDangNhap.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      ||  xoa_dau(item.action.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      || xoa_dau(item.tenDangNhap.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      )

      setTable({...table,data : temp as any})
      clearInterval(searchRef.current as any)
    }, 700);
  }
  const handleDateChange = (start:any,end:any)=>{
    let temp = logs.filter((log)=>{
      let temp = log.actionTime as any
      return  (moment(temp.toDate()) >= start && moment(temp.toDate()) <= end) || (moment(temp.toDate()).isSame(end,'day') || moment(temp.toDate()).isSame(start,'day'))
    }).filter(item=>
      xoa_dau(item.tenDangNhap.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
      ||  xoa_dau(item.action.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
      || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
      || xoa_dau(item.tenDangNhap.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
      )

      setTable({...table,data : temp as any})
  }

  const handleStartDateChange = (date: any, dateString: String) => {
    let temp = date.clone()
    if(date > time.endDay){
      setTime({startDay: temp,endDay: date.add(7,'days')})
      handleDateChange(temp,date)
    }else{
     setTime({...time,startDay: temp})
     handleDateChange(temp,time.endDay)
    }
  };
  const handleEndDateChange = (date: any, dateString: String) => {
    setTime({...time,endDay: date})
    handleDateChange(time.startDay,date)
  };
  function disabledDate(current:any) {  
    return current < time.startDay ;
  }

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] md:mt-3 lg:pr-2 relative user-log'>
      <div className='path text-primary-gray-light-400 font-bold text-lg mb-11'>
        Cài đặt hệ thống &gt;{' '}
        <span className='text-primary font-bold'>Nhật ký hoạt động</span>
      </div>
      <div className='controls flex justify-between items-center md:flex-col'>
        <div className='flex gap-x-2'>
          <div className='item flex flex-col md:items-center'>
            <span className='font-semibold text-base leading-6 mb-1 text-primary-gray-500'>
              Chọn thời gian
            </span>
            <div className='date-controls '>
              <DatePicker
                onChange={handleStartDateChange}
                className='rounded-lg w-[150px] h-11'
                format={'DD/MM/YYYY'}
                name='startDay'
                value={time.startDay}
              />
              <CaretRightOutlined className='mx-2' />
              <DatePicker
              disabledDate={disabledDate}
                onChange={handleEndDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
                name='endDay'
                value={time.endDay}
              />
            </div>
          </div>
        </div>
        <div className='item flex flex-col text-base md:items-center'>
          <span className='font-semibold mb-1 text-primary-gray-500'>
            Từ khoá
          </span>
          <Input.Search
            placeholder='Nhập từ khóa'
            onChange={handleKeyWordChange}
            className='w-[300px] h-11 text-primary-gray-400'
          />
        </div>
      </div>
      <div className='relative'>
        <Table
          className='mt-4'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
      </div>
    </div>
  );
};

export default UserLog;
