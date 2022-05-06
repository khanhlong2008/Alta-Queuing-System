import React, { useState } from "react";
import { Form, Input, Button, Space, Row, Col, Checkbox } from "antd";
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
export const UpdateRole = () => {
  const [vaitro, setvaitro] = useState({
    tenvaitro: "Lễ tân",
    mota: "Thực hiện nhiệm vụ về thống kê số iệu và tổng hợp số liệu",
    functionA: {
      all: true,
      x: true,
      y: true,
      z: false,
    },
    functionB: {
      all: true,
      x: true,
      y: true,
      z: false,
    },
  });
  const onFinish = (values: any) => {
    console.log(vaitro, values);
  };
  function onChangeFunctionA(checkedValues: any) {
    let temp = { ...vaitro };
    if (checkedValues.includes("resetfunctionZ")) {
      temp.functionA.z = true;
      setvaitro({ ...temp });
    }
  }
  function onChangeFunctionB(checkedValues: any) {
    let temp = { ...vaitro };
    if (checkedValues.includes("resetfunctionZ")) {
      temp.functionB.z = true;
      setvaitro({ ...temp });
    }
  }
  const handleNameRole = (e: any) => {
    let value = e.target.value;

    if (!Number(value)) {
      return;
    }
    setvaitro({ ...vaitro, tenvaitro: value });
  };
  const handleDescribeRole = (e: any) => {
    let value = e.target.value;

    if (!Number(value)) {
      return;
    }
    setvaitro({ ...vaitro, mota: value });
  };
  const handleFormChange = (e: any) => {
    if (e.target.id === "nest-messages_dichvu_maDv") {
      console.log(e.target.value);
    }
  };
  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] relative ">
      <div className="path text-gray-600 font-bold text-lg mb-11">
        Cài đặt hệ thống &gt; quản lý&gt;
        <span className="text-primary font-bold">Thêm vai trò</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">
        Danh sách vai trò
      </h2>
      <div className="w-full h-full add-content">
        <h3 className="text-primary text-lg font-bold mb-3">
          Thông tin vai trò
        </h3>
        <Form
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          onChange={handleFormChange}
        >
          <Row gutter={[16, 16]} className="mb-5">
            <Col span={12}>
              <Form.Item
                name={["dichvu", "maDv"]}
                label="Tên vai trò:"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên vai trò",
                  },
                ]}
              >
                <p>
                  <Input value={vaitro.tenvaitro} onChange={handleNameRole} />
                </p>
              </Form.Item>
              <Form.Item
                name={["dichvu", "moTa"]}
                label="Mô tả :"
                className="textarea "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả",
                  },
                ]}
              >
                <div className="h-44">
                  <Input.TextArea
                    className="ml-7 w-[655px] "
                    value={vaitro.mota}
                    onChange={handleDescribeRole}
                  />
                </div>
                <span>
                  <span className="text-primary ml-6">*</span> Là trường thông
                  tin bắt buộc
                </span>
              </Form.Item>
            </Col>
            <Col span={12} className=" ">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <span className="">
                    Phân quyền chức năng
                    <span className="text-primary">&nbsp;*</span>
                  </span>
                </Col>
                <Col span={24} className="bg-primary-organe-50">
                  <Form.Item
                    name={["dichvu", "capSo"]}
                    className="content pl-[24px] pt-[29px] pr-[100px]"
                  >
                    <h3 className="text-primary text-lg font-bold mb-3">
                      Nhóm chức năng A
                    </h3>
                    <Checkbox.Group onChange={onChangeFunctionA}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Checkbox value="all" style={{ lineHeight: "10px" }}>
                            Tất cả
                          </Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="x" style={{ lineHeight: "10px" }}>
                            Chức năng x
                          </Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="y" style={{ lineHeight: "10px" }}>
                            Chức năng y
                          </Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox
                            value={vaitro.functionA.z}
                            style={{ lineHeight: "10px" }}
                          >
                            Chức năng z
                          </Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    name={["dichvu", "capSo"]}
                    className="content pl-[24px] pt-[5px] pr-[100px]"
                  >
                    <h3 className="text-primary text-lg font-bold mb-3">
                      Nhóm chức năng B
                    </h3>
                    <Checkbox.Group onChange={onChangeFunctionB}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Checkbox value="all" style={{ lineHeight: "10px" }}>
                            Tất cả
                          </Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="x" style={{ lineHeight: "10px" }}>
                            Chức năng x
                          </Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="y" style={{ lineHeight: "10px" }}>
                            Chức năng y
                          </Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox
                            value={vaitro.functionB.z}
                            style={{ lineHeight: "10px" }}
                          >
                            Chức năng z
                          </Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item className="">
            <Space align="center" className=" flex justify-center w-full">
              <Button className="bg-primary-50 rounded-lg border-primary  text-primary  text-center px-[15px] py-[4px] font-bold hover:text-primary hover:border-primary">
                Hủy bỏ
              </Button>
              <Button
                className="bg-primary rounded-lg border-primary  text-white  text-center px-[15px] py-[4px] font-bold hover:border-primary hover:bg-primary hover:text-white"
                htmlType="submit"
              >
                Thêm dịch vụ
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
