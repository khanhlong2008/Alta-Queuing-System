import React, { useEffect } from "react";
import { Row, Col, Form, Input, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const AddAccount = () => {
  const { Option } = Select;
  function handleChangeActive(value: any) {
    console.log(`Selected: ${value}`);
  }

  const deciceList = ["Tất cả", "Ngưng hoạt động", "Hoạt động"];
  const children = [];
  for (let i = 0; i < deciceList.length; i++) {
    children.push(<Option key={i}>{deciceList[i]}</Option>);
  }
  function handleChangeRole(value: any) {
    console.log(`Selected: ${value}`);
  }
  const deciceListRole = ["Kế toán", "Quản lý", "Admin"];
  const childrenRole = [];
  for (let i = 0; i < deciceList.length; i++) {
    childrenRole.push(<Option key={i}>{deciceListRole[i]}</Option>);
  }

  // View data
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      hoTen: "",
      tinhTrang: ["Hoạt Động"],
      vaiTro: "",
      std: "",
      tenDangNhap: "",
      email: "",
      matKhau: "CMSCMS",
      nhapMatKhau: "CMSCMS",
    });
  }, []);
  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] relative">
      <div className="path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-4">
        Cài đặt hệ thống &gt;Quản lý tài khoản &gt;{" "}
        <span className="text-primary-500 text-xl leading-[30px] font-bold">
          Thêm tài khoản
        </span>
      </div>
      <h2 className="text-primary-500 text-2xl font-bold mb-4">
        Quản lý tài khoản
      </h2>
      <div className="py-2 px-6 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)] add-content">
        <h3 className="text-xl font-bold leading-[30px] text-primary mb-4">
          Thông tin tài khoản
        </h3>
        <Form className="" form={form}>
          <Row gutter={{ lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="Họ tên "
                name="hoTen"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập mã thiết bị"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên đăng nhập"
                name="tenDangNhap"
                rules={[
                  {
                    required: true,
                    message: "Please input your user name!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập tài khoản"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="std"
                rules={[
                  {
                    required: true,
                    message: "Please input your device name!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập tên thiết bị"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mật khẩu"
                name="matKhau"
                rules={[
                  {
                    required: true,
                    message: "Please input your type of device !",
                  },
                ]}
              >
                <Input.Password
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your IP Address!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập địa chỉ IP"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nhập lại mật khẩu"
                name="nhapMatKhau"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Vai trò"
                name="vaiTro"
                rules={[
                  {
                    required: true,
                    message: "Please input your type of device !",
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={"large"}
                  placeholder="Chọn vai trò"
                  onChange={handleChangeRole}
                  className="w-full h-11"
                >
                  {childrenRole}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tình trạng"
                name="tinhTrang"
                rules={[
                  {
                    required: true,
                    message: "Please input your type of device !",
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={"large"}
                  placeholder="Chọn loại tình trạng"
                  onChange={handleChangeActive}
                  className="w-full h-11"
                >
                  {children}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <span className="text-sm font-normal leading-5 text-primary-gray-300">
            <strong className="text-primary-red">* </strong>
            Là trường thông tin bắt buộc
          </span>
          <div className="flex justify-center items-center mt-6 gap-x-8">
            <button
              type="submit"
              className="w-[160px] text-primary px-6 py-[13px] rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white leading-[22px]"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="w-[160px] text-white px-6 py-[13px] rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 leading-[22px]"
            >
              Cập nhật
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddAccount;
