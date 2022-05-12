import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { Table } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./style.scss";
import { Link } from "react-router-dom";
type Props = {};
//
const columns = [
  {
    title: "Tên đăng nhập",
    dataIndex: "tendangnhap",
    width: "10%",
  },
  {
    title: "Họ tên",
    dataIndex: "hoten",
    width: "10%",
  },
  {
    title: "Số điện thoại",
    dataIndex: "sdt",
    width: "10%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "15%",
  },
  {
    title: "Tên vai trò",
    dataIndex: "tenvaitro",
    width: "10%",
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "trangThai",
    width: "15%",
    render: (trangThai: any) =>
      trangThai ? (
        <span className="flex items-center gap-x-2">
          <span className="block h-2 w-2 bg-primary-green-500 rounded-full"></span>{" "}
          Hoạt động
        </span>
      ) : (
        <span className="flex items-center gap-x-2">
          <span className="block h-2 w-2 bg-primary-red rounded-full"></span>
          Ngưng hoạt động
        </span>
      ),
  },
  {
    title: "",
    width: "8%",
    dataIndex: "action2",
    render: (item: any, record: any) => (
      <Link
        className="text-blue-500 underline"
        to={`/system-installation/account-manager/update/${record.hoten}`}
      >
        Cập nhật
      </Link>
    ),
  },
];

const AccountManager = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });
  const { Option } = Select;
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let name = [" A", "B", "C", "D", "E", "F", "L", "H"];
      const randomName = Math.floor(Math.random() * name.length);
      const Role = [
        "Kế toán",
        "Bác sĩ",
        "Lễ tân",
        "Admin",
        "Quản lý",
        "Superadmin",
      ];
      const randomRole = Math.floor(Math.random() * Role.length);
      let temp = {
        key: index,
        tendangnhap: `Tuyetnguyeen@${index}`,
        hoten: `Nguyen Van ${name[randomName]}`,
        sdt: "0386060789",
        trangThai: index % 2 === 0 ? true : false,
        email: `tuyetnguyen12${index + 1}@gamil.com`,
        tenvaitro: `${Role[randomRole]}`,
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };

  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] relative">
      <div className="path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-11">
        Cài đặt hệ thống &gt;{" "}
        <span className="text-primary-500 text-xl leading-[30px] font-bold">
          Quản lý tài khoản
        </span>
      </div>
      <h2 className="text-primary-500 text-2xl font-bold mb-4">
        Danh sách tài khoản
      </h2>
      <div className="controls flex justify-between">
        <div className="flex gap-x-6">
          <div className="item flex flex-col text-base">
            <span className="font-semibold mb-1 text-primary-gray-500">
              Tên vai trò
            </span>
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={handleChange}
              defaultValue={"Tất cả"}
              className="w-[300px] h-11 text-primary-gray-400"
            >
              <Option value="all">Tất cả</Option>
              <Option value="online">Hoạt động</Option>
              <Option value="offline">Ngưng hoạt động</Option>
            </Select>
          </div>
        </div>
        <div className="item flex flex-col text-base">
          <span className="font-semibold mb-1 text-primary-gray-500">
            Từ khoá
          </span>
          <Input.Search
            placeholder="Nhập từ khóa"
            onSearch={(value) => console.log(value)}
            className="w-[300px] h-11 text-primary-gray-400"
          />
        </div>
      </div>
      <div className="relative">
        <Table
          className="mt-4"
          columns={columns}
          dataSource={table.data}
          pagination={{ ...table.pagination, onChange: handlePanigationChange }}
          loading={table.loading}
        />
        {/* Add button */}
        <Link
          to="/system-installation/account-manager/add-account"
          className="absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary cursor-pointer hover:text-primary"
        >
          <i className="fa fa-plus-square text-xl"></i>
          <span className="font-semibold text-sm leading-[19px]">
            Thêm tài khoản
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AccountManager;
