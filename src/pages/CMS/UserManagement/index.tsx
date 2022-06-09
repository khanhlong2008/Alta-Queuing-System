import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import { Table } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.scss';
import userServices from '../../../db/services/user.services';
import IUser from '../../../db/types/user.type';
import RoleServices from '../../../db/services/role.services';
import IRole from '../../../db/types/role.type';

type Props = {};

const columns = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'tenDangNhap',
    width: '10%',
  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    width: '15%',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'soDienThoai',
    width: '14%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    title: 'Vai trò',
    dataIndex: 'vaiTro',
    width: '10%',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'trangThai',
    render: (trangThai: any) =>
    trangThai ? (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-green-500 rounded-full flex-shrink-0'></span>{' '}
          Hoạt động
        </span>
      ) : (
        <span className='flex items-center gap-x-2'>
          <span className='block h-2 w-2 bg-primary-red rounded-full flex-shrink-0'></span>
          Ngưng hoạt động
        </span>
      ),
  },
  {
    title: '',
    dataIndex: 'action1',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/user-management/update/${record.id}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const UserManager = (props: Props) => {
  const [users, setUsers]= useState<IUser[]>([])
  const [roles, setRoles]= useState<IRole[]>([])

  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });
  const { Option } = Select;
  useEffect(() => {
    (async()=>{
    let data = await userServices.getUsers()
    let roles = await RoleServices.getRoles()
    data = data.map(item=>{
    //Format vai tro
    let role= roles.find(role=>role.id === item.vaiTro)
    return {
      ...item,
      key : item.tenDangNhap,
      vaiTro : role ? role.tenVaiTro : 'Problem',
      maVaiTro : role?.id
    }
  })
    setUsers(data)
    //Add role tat ca
    roles.unshift({
      moTa: 'Example',
      id : 'all',
      tenVaiTro: 'Tất cả'
    })
    setRoles(roles)
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
  const handleChangeKeyWord = (e:React.FormEvent<HTMLInputElement>)=>{
    let value= e.currentTarget.value
    if(searchRef){
      clearInterval(searchRef.current as any)
    }
    searchRef.current = setTimeout(() => {
     let temp = users.filter(item=>
      xoa_dau(item.tenDangNhap.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      ||  xoa_dau(item.email.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      || xoa_dau(item.hoTen.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      || xoa_dau(item.vaiTro.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase()))
      )

      setTable({...table,data : temp as any})
      clearInterval(searchRef.current as any)
    }, 700);
  }
  const handleRoleChange = (value:any)=>{
    let temp = value !== 'all' ? users.filter(item => item.maVaiTro === value ) : users
    console.log(value)
    setTable({...table,data : temp as any})
  }
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:mt-3 relative user'>
      <div className='path text-gray-600 font-bold text-lg mb-11'>
        Cài đặt hệ thống &gt;{' '}
        <span className='text-primary font-bold'>Quản lý tài khoản</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>
        Danh sách tài khoản
      </h2>
      <div className='controls flex justify-between md:flex-col md:items-center md:mb-3'>
        <div className='flex gap-x-2'>
          <div className='item flex flex-col text-sm md:items-center'>
            <span className='font-semibold mb-1 text-primary-gray-500'>
              Tên vai trò
            </span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              defaultValue={'all'}
              className='w-[300px] h-11 text-primary-gray-400'
              onChange={handleRoleChange}
            >
              {roles && roles.map((item)=>{
                return <Option key={item.id}>{item.tenVaiTro}</Option>
              })}
            </Select>
          </div>
        </div>
        <div className='item flex flex-col text-base md:items-center mt-2'>
          <span className='font-semibold mb-1 text-primary-gray-500'>
            Từ khoá
          </span>
          <Input.Search
            placeholder='Nhập từ khóa'
            onChange={handleChangeKeyWord}
            className='w-[300px] h-11 text-primary-gray-400'
          />
        </div>
      </div>
      <div className='relative md:overflow-y-scroll md:max-h-[60vh]'>
        <Table
          className='mt-4 overflow-x-scroll'
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <Link
          to='/user-management/add'
          className='lg:relative lg:top-auto lg:right-auto lg:w-full absolute -right-28 px-3 py-1 top-0 flex flex-col h-[94px] w-24 justify-center items-center text-center bg-primary-50 text-primary cursor-pointer hover:text-primary'
        >
          <i className='fa fa-plus-square text-xl'></i>
          <span className='font-semibold text-sm leading-[19px]'>
            Thêm tài khoản
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserManager;
