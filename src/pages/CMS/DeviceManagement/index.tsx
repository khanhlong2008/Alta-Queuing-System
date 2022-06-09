import React, { useEffect, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
import DeviceServices from '../../../db/services/device.services';
import ServiceServices from '../../../db/services/service.services';

import IDevice from '../../../db/types/device.type';
type Props = {};

const columns = [
  {
    title: 'Mã thiết bị',
    dataIndex: 'maThietBi',
    width: '12%',
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'tenThietBi',
    width: '12%',
  },
  {
    title: 'Địa chỉ IP',
    dataIndex: 'ip',
    width: '10%',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'trangThaiHoatDong',
    width: '18%',
    render: (trangThai: any) =>
      trangThai ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-green-500 rounded-full'></span>{' '}
          Hoạt động
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-red rounded-full'></span>
          Ngưng hoạt động
        </span>
      ),
  },
  {
    title: 'Trạng thái kết nối',
    dataIndex: 'trangThaiKetNoi',
    width: '15%',
    render: (ketNoi: any) =>
      ketNoi ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-green-500 rounded-full'></span>{' '}
          Kết nối
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-red rounded-full'></span>
          Mất kết nối
        </span>
      ),
  },
  {
    title: 'Dịch vụ sử dụng',
    dataIndex: 'dichVuSuDung',

    render: (dichVuSuDung: any) => {
      let item = dichVuSuDung.join(',');
      return (
        <div>
          <span className='limit-1 w-16'>{item}</span>
          <strong className='underline text-primary-blue cursor-pointer'>
            Xem thêm
          </strong>
        </div>
      );
    },
  },
  {
    title: '',
    dataIndex: 'action1',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/devices-management/detail/${record.id}`}
      >
        Chi tiết
      </Link>
    ),
  },
  {
    title: '',
    dataIndex: 'action2',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/devices-management/update/${record.id}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const DeviceManager = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 9,
    },
    loading: false,
  });
  const [devices, setDevices] = useState<IDevice[]>([])
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [key, setKey]= useState('')
  const [statusConnect, setStatusConnect]= useState('all')
  const [statusActivity, setStatusActivity]= useState('all')


  const { Option } = Select;

  useEffect(() => {
    //Data demo
    (async()=>{
      let data = await DeviceServices.getDevices()
      let services = await ServiceServices.getServices()
      data = data.map(item=>{
        let DSDV = item.dichVuSuDung.map((dv)=>{
          let service = services.find(ser=>ser.maDichVu === dv)
          return service?.tenDichVu
        })
      return {
        ...item,
        key : item.id,
        dichVuSuDung: DSDV as any
      }
    })
      setDevices(data)
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
   let temp = devices.filter(item=>
    xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
    ||  xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
    || xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase())))

    setTable({...table,data : temp as any})
    clearInterval(searchRef.current as any)
  }, 700);
}

function handleStatusConnectChange(value: any) {
  let trangThaiHoatDong = statusActivity === 'all' ? '' : (statusActivity === 'online' ? true: false)
  let active = value === 'online' ? true : false

  setStatusConnect(value)
  if(trangThaiHoatDong === ''){
      if(value === 'all'){
        let temp = devices.filter(item=>
        (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
         ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
         || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))))
         setTable({...table,data : temp as any})
      }else{
        let temp = devices.filter(item=>
          (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
          ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
          || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase())))
          && item.trangThaiKetNoi === active)
          setTable({...table,data : temp as any})
      }
    return;
  }else{
    if(value=== 'all'){
      let temp = devices.filter(item=>
        (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase())))
        && item.trangThaiHoatDong === trangThaiHoatDong)
        setTable({...table,data : temp as any})
    }else{
      let temp = devices.filter(item=>
        (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase())))
        && item.trangThaiHoatDong === trangThaiHoatDong && item.trangThaiKetNoi === active)
        setTable({...table,data : temp as any})
    }
  }
}
function handleStatusActivityChange(value: any) {
  let trangThaiKetNoi = statusConnect === 'all' ? '' : (statusConnect === 'online' ? true: false)
  let active = value === 'online' ? true : false

  setStatusActivity(value)
  if(trangThaiKetNoi === ''){
      if(value === 'all'){
        let temp = devices.filter(item=>
        (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
         ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
         || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))))
         setTable({...table,data : temp as any})
      }else{
        let temp = devices.filter(item=>
          (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
          ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
          || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase())))
          && item.trangThaiHoatDong === active)
          setTable({...table,data : temp as any})
      }
    return;
  }else{
    if(value === 'all'){
      let temp = devices.filter(item=>
        (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase())))
        && item.trangThaiKetNoi === trangThaiKetNoi)
        setTable({...table,data : temp as any})
    }else{
      let temp = devices.filter(item=>
        (xoa_dau(item.maThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        ||  xoa_dau(item.tenThietBi.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase()))
        || xoa_dau(item.ip.toLocaleLowerCase()).includes(xoa_dau(key.toLocaleLowerCase())))
        && item.trangThaiKetNoi === trangThaiKetNoi && item.trangThaiHoatDong === active)
        setTable({...table,data : temp as any})
    }
  }
}

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] relative device lg:pr-1'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-11'>
        Thiết bị &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          Danh sách thiết bị
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold mb-4'>
        Quản lý thiết bị
      </h2>
      <div className='controls flex justify-between lg:flex-col lg:gap-y-3 md:justify-center md:items-center'>
        <div className='flex gap-x-6  md:flex-col'>
          <div className='item flex flex-col text-base'>
            <span className='font-semibold mb-1 text-primary-gray-500'>
              Trạng thái hoạt động
            </span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleStatusActivityChange}
              defaultValue={'all'}
              className='w-[300px] h-11 text-primary-gray-400'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='online'>Hoạt động</Option>
              <Option value='offline'>Ngưng hoạt động</Option>
            </Select>
          </div>
          <div className='item flex flex-col text-base'>
            <span className='font-semibold mb-1 text-primary-gray-500'>
              Trạng thái kết nối
            </span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleStatusConnectChange}
              defaultValue={'Tất cả'}
              className='w-[300px] h-11 text-primary-gray-400'
            >
              <Option value='all'>Tất cả</Option>
              <Option value='online'>Kết nối</Option>
              <Option value='offline'>Mất kết nối</Option>
            </Select>
          </div>
        </div>
        <div className='item flex flex-col text-base'>
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
      <div className='relative xl:flex xl:flex-col'>
        <Table
          className='mt-4'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <Link
          to='/devices-management/add'
          className='xl:relative xl:right-auto xl:top-auto xl:w-full absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary cursor-pointer hover:text-primary'
        >
          <i className='fa fa-plus-square text-xl'></i>
          <span className='font-semibold text-sm leading-[19px]'>
            Thêm thiết bị
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DeviceManager;
