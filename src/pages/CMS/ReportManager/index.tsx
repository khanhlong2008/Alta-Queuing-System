import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, DatePicker, Row, Col } from "antd";
import {
  CaretRightOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import "./style.scss";
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    width: "20%",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "tenDv",
    width: "20%",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "tgCap",
    width: "20%",
  },
  {
    title: "Trạng thái",
    width: "20%",

    dataIndex: "trangThai",
    render: (trangThai: any) =>
      trangThai === "used" ? (
        <span className="flex items-center gap-x-2">
          <span className="block h-1 w-1 bg-primary-gray-300 rounded-full shrink-0"></span>
          Đã sử dụng
        </span>
      ) : trangThai === "pending" ? (
        <span className="flex items-center gap-x-2">
          <span className="block h-1 w-1 bg-primary-blue rounded-full shrink-0"></span>
          Đang chờ
        </span>
      ) : (
        <span className="flex items-center gap-x-2">
          <span className="block h-1 w-1 bg-primary-red rounded-full shrink-0"></span>
          Bỏ qua
        </span>
      ),
  },
  {
    title: "Nguồn cấp",
    dataIndex: "nguonCap",
    width: "20%",
  },
];
export const ReportManager = () => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  });
  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let random = Math.floor(Math.random() * (3 - 1 + 1) + 0);
      let temp = {
        key: index,
        stt: `201000${index}`,
        tenDv: `Khám tim mạch`,
        tgCap: `14:35 - 07/11/2021`,
        trangThai: random === 1 ? "used" : random === 2 ? "pending" : "next",
        nguonCap: index % 2 === 0 ? "Kiosk" : "Hệ thống",
      };
      data.push(temp);
    }

    setTable({ ...table, data: data as any });
  }, []);

  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  const handleDateChange = (date: any, dateString: String) => {
    console.log(date, dateString);
  };

  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] relative ">
      <div className="path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-11">
        Báo cáo &gt;{" "}
        <span className="text-primary-500 text-xl leading-[30px] font-bold">
          Thiết lập báo cáo
        </span>
      </div>
      <div className="controls flex justify-between">
        <div className="flex gap-x-6">
          <div className="item flex flex-col text-base">
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
      </div>
      <div className="relative">
        {/* Add button */}
        <Link
          to="/*"
          className="absolute -right-28 top-0 flex flex-col h-[94px] w-20 justify-center items-center text-center 
          bg-primary-50 text-primary cursor-pointer hover:text-primary"
        >
          <div className="w-5 h-5">
            <img src="/images/svgs/document-dowload.svg" alt="" />
          </div>
          <span className="font-semibold text-sm leading-[19px]">Tải về</span>
        </Link>
        <div className="flex flex-row  absolute top-2 right-0 left-0">
          <div className=" basis-full flex justify-end ">
            <div className="flex flex-col  dropdown">
              <div className="dropdown-list1">
                <div className="dropdown-list__item">Tất cả</div>
                <div className="dropdown-list__item">2010000</div>
                <div className="dropdown-list__item">2010001</div>
                <div className="dropdown-list__item">2010002</div>
              </div>

              <CaretUpOutlined className="mx-2 text-primary-light-gray" />
              <CaretDownOutlined className="mx-2 text-primary-light-gray" />
            </div>
          </div>
          <div className=" basis-full flex justify-end">
            <div className="flex flex-col  dropdown">
              <div className="dropdown-list1">
                <div className="dropdown-list__item">Tất cả</div>
                <div className="dropdown-list__item">2010000</div>
                <div className="dropdown-list__item">2010001</div>
                <div className="dropdown-list__item">2010002</div>
              </div>

              <CaretUpOutlined className="mx-2 text-primary-light-gray" />
              <CaretDownOutlined className="mx-2 text-primary-light-gray" />
            </div>
          </div>
          <div className=" basis-full flex justify-end">
            <div className="flex flex-col  dropdown">
              <div className="dropdown-list1">
                <div className="dropdown-list__item">Tất cả</div>
                <div className="dropdown-list__item">2010000</div>
                <div className="dropdown-list__item">2010001</div>
                <div className="dropdown-list__item">2010002</div>
              </div>

              <CaretUpOutlined className="mx-2 text-primary-light-gray" />
              <CaretDownOutlined className="mx-2 text-primary-light-gray" />
            </div>
          </div>
          <div className=" basis-full flex justify-end">
            <div className="flex flex-col  dropdown">
              <div className="dropdown-list1">
                <div className="dropdown-list__item">Tất cả</div>
                <div className="dropdown-list__item">2010000</div>
                <div className="dropdown-list__item">2010001</div>
                <div className="dropdown-list__item">2010002</div>
              </div>

              <CaretUpOutlined className="mx-2 text-primary-light-gray" />
              <CaretDownOutlined className="mx-2 text-primary-light-gray" />
            </div>
          </div>
          <div className=" basis-full flex justify-end">
            <div className="flex flex-col  dropdown">
              <div className="dropdown-list1">
                <div className="dropdown-list__item">Tất cả</div>
                <div className="dropdown-list__item">2010000</div>
                <div className="dropdown-list__item">2010001</div>
                <div className="dropdown-list__item">2010002</div>
              </div>

              <CaretUpOutlined className="mx-2 text-primary-light-gray" />
              <CaretDownOutlined className="mx-2 text-primary-light-gray" />
            </div>
          </div>
        </div>
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
