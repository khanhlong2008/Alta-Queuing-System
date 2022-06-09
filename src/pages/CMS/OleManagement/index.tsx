import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import { Table } from 'antd';
import './style.scss';
import { Link } from 'react-router-dom';
import RoleServices from "../../../db/services/role.services";
import IRole from "../../../db/types/role.type";
type Props = {};

const columns = [
  {
    title: 'Tên vai trò',
    dataIndex: 'tenVaiTro',
    width: '20%',
  },
  {
    title: 'Số người dùng',
    dataIndex: 'soNguoiDung',
    width: '20%',
  },

  {
    title: 'Mô tả',
    dataIndex: 'moTa',
  },
  {
    title: '',
    dataIndex: 'action1',
    render: (item: any, record: any) => (
      <Link
        className='text-blue-500 underline'
        to={`/ole-management/update/${record.id}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const OleManager = (props: Props) => {
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

  useEffect(() => {
    (async()=>{
    let data = await RoleServices.getRoles()
    data = data.map(item=>{
      return {
        ...item,
        key : item.id
      }
    })
    setRoles(data)
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
     let temp = roles.filter(item=>xoa_dau(item.tenVaiTro.toLocaleLowerCase()).includes(xoa_dau(value.toLocaleLowerCase())))

      setTable({...table,data : temp as any})
      clearInterval(searchRef.current as any)
    }, 700);
  }

  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:mt-3 relative ole'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-11'>
        Cài đặt hệ thống &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          Quản lý vai trò
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold mb-4'>
        Danh sách vai trò
      </h2>
      <div className='controls flex justify-end md:w-full md:items-center md:justify-center'>
        <div className='item flex flex-col text-base md:items-center'>
          <span className='font-semibold mb-1 text-primary-gray-500'>
            Từ khoá
          </span>
          <Input.Search
            placeholder='Nhập từ khóa'
            onChange={handleChangeKeyWord}
            className='w-[240px] h-11 text-primary-gray-400'
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
        {/* Add button */}
        <Link
          to='/ole-management/add'
          className='lg:w-full lg:relative lg:right-auto lg:top-auto absolute -right-28 px-3 py-1 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary cursor-pointer hover:text-primary'
        >
          <i className='fa fa-plus-square text-xl'></i>
          <span className='font-semibold text-sm leading-[19px]'>
            Thêm vai trò
          </span>
        </Link>
      </div>
    </div>
  );
};

export default OleManager;
