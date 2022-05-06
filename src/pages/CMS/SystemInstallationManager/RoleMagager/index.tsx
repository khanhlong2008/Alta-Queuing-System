import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { Input } from "antd";

const columns = [
  {
    title: "Tên vai trò",
    dataIndex: "tenvaitro",
    width: "10%",
  },
  {
    title: "Số người dùng",
    dataIndex: "songuoidung",
    width: "10%",
  },

  // {
  //   title: "Trạng thái hoạt động",
  //   dataIndex: "trangThai",
  //   width: "15%",
  //   render: (trangThai: any) =>
  //     trangThai ? (
  //       <span className="flex items-center gap-x-2">
  //         <span className="block h-2 w-2 bg-primary-green-500 rounded-full"></span>{" "}
  //         Hoạt động
  //       </span>
  //     ) : (
  //       <span className="flex items-center gap-x-2">
  //         <span className="block h-2 w-2 bg-primary-red rounded-full"></span>
  //         Ngưng hoạt động
  //       </span>
  //     ),
  // },

  {
    title: "Mô tả",
    dataIndex: "mota",
    width: "30%",
    // render: (mota: any) => {
    //   let item = mota.join(",");
    //   return (
    //     <div>
    //       <span className="limit-1">{item}</span>
    //       {/* <strong className="underline text-primary-blue cursor-pointer">
    //         Xem thêm
    //       </strong> */}
    //     </div>
    //   );
    // },
  },
  {
    title: "",
    width: "8%",
    dataIndex: "action2",
    render: (item: any, record: any) => (
      <Link
        className="text-blue-500 underline"
        to={`/devices-management/update/${record.maThietBi}`}
      >
        Cập nhật
      </Link>
    ),
  },
];
export const RoleManager = () => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });
  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let random = Math.floor(Math.random() * 10);
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
        tenvaitro: `${Role[randomRole]}`,
        songuoidung: `${random}`,
        ip: "192.168.1.10",
        trangThai: index % 2 === 0 ? true : false,
        mota: "Thực hiện nhiệm vụ về thống kê số iệu và tổng hợp số liệu",
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
          Quản ký vai trò
        </span>
      </div>
      <h2 className="text-primary-500 text-2xl font-bold mb-4">
        Quản lý vai trò
      </h2>
      <div className="controls flex justify-between">
        <div className="flex gap-x-6"></div>
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
          to="/system-installation/user-manager/add-role"
          className="absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center bg-primary-50 text-primary cursor-pointer hover:text-primary"
        >
          <i className="fa fa-plus-square text-xl"></i>
          <span className="font-semibold text-sm leading-[19px] w-12 ">
            Thêm vai trò
          </span>
        </Link>
      </div>
    </div>
  );
};
