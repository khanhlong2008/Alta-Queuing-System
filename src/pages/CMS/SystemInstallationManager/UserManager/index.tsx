import React, { useEffect, useState } from "react";
import { DatePicker, Input } from "antd";
import { Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
type Props = {};
const columns = [
  {
    title: "Tên đăng nhập",
    dataIndex: "tenDangNhap",
    width: "20%",
  },
  {
    title: "Thời gian tác động",
    dataIndex: "thoiGianTacDong",
    width: "20%",
  },
  {
    title: "IP thực hiện",
    dataIndex: "IP",
    width: "20%",
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "thaoTacThucHien",
    width: "30%",
  },
];

const UserManager = (props: Props) => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  });
  const handleDateChange = (date: any, dateString: String) => {
    console.log(date, dateString);
  };
  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let temp = {
        key: index,
        tenDangNhap: `Tuyetnguyen@12${index + 3 - 2}`,
        thoiGianTacDong: "01/12/2021 15:12:17",
        IP: "192.168.3.1",
        thaoTacThucHien: "Cập nhật thông tin dịch vụ DV_01",
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
      <div className="path text-gray-600 font-bold text-lg mb-11">
        Cài đặt hệ thống &gt;{" "}
        <span className="text-primary font-bold">Nhật ký hoạt động</span>
      </div>
      <div className="controls flex justify-between">
        <div className="flex gap-x-2">
          <div className="item flex flex-col text-sm">
            <span className="font-semibold">Chọn thời gian</span>
            <div className="date-controls">
              <DatePicker
                onChange={handleDateChange}
                className="rounded-lg"
                format={"DD/MM/YYYY"}
              />
              <CaretRightOutlined className="mx-2" />
              <DatePicker
                onChange={handleDateChange}
                className="rounded-lg"
                format={"DD/MM/YYYY"}
              />
            </div>
          </div>
        </div>
        <div className="item flex flex-col text-sm">
          <span className="font-semibold">Từ khoá</span>
          <Input.Search
            placeholder="Nhập từ khóa"
            onSearch={(value) => console.log(value)}
            className="w-[250px]"
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
      </div>
    </div>
  );
};

export default UserManager;
