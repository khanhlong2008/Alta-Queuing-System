import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Select, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./style.scss";
import { useForm } from "antd/lib/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import RoleServices from "../../../../db/services/role.services";
import IRole from "../../../../db/types/role.type";
import UserServices from "../../../../db/services/user.services";
import IUser from "../../../../db/types/user.type";
import LogServices from "../../../../db/services/log_system.services";
import ILog from "../../../../db/types/log_system.type";
import { fetchIP } from "../../../../db/others/ipaddress";
import { useAppSelector} from "../../../../app/hooks";
import { selectUser } from "../../../../features/user/userSlice";
import Swal from "sweetalert2";

const validateMessages = {
  required: "${label} is required!",
};

const UpdateUser = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useNavigate();
  const { Option } = Select;
  const [roles, setRoles] = useState<IRole[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>();
  const me = useAppSelector(selectUser)
  // Tình trạng
  const statusList = [
    {
      name: "Ngưng hoạt động",
      value: 0,
    },
    {
      name: "Hoạt động",
      value: 1,
    },
  ];
  const childrens = [];
  for (let i = 0; i < statusList.length; i++) {
    childrens.push(
      <Option key={statusList[i].value}>{statusList[i].name}</Option>
    );
  }
  useEffect(() => {
    (async () => {
      let data = await RoleServices.getRoles();
      setRoles([...data]);
      let temp = await UserServices.getUsers();
      setUsers([...temp]);

      let index = temp.findIndex((item) => item.id === id);
      if (index === -1) {
        history("/user-management");
      } else {
        setUser(temp[index])
        form.setFieldsValue({
          ...temp[index],
          vaiTro: temp[index].vaiTro,
          tinhTrang: temp[index].trangThai ? '1' :'0',
          nhapLaiMatKhau : temp[index].matKhau
        });
      }
    })();
  }, []);

  const onFinish = async(values: any) => {
    // Check use exist
    let index = users.filter(item=>item.tenDangNhap !== user?.tenDangNhap).findIndex(
      (item) =>
        item.tenDangNhap.toLocaleLowerCase() ===
        values.tenDangNhap.toLocaleLowerCase()
    );
    if (index !== -1) {
      Swal.fire({
        title: "Error!",
        text: "Đã tồn tại tên đăng nhập này",
        icon: "error",
        confirmButtonText: "Xác nhận",
      });
      return;
    } else {
      if (values.matKhau !== values.nhapLaiMatKhau) {
        Swal.fire({
          title: "Error!",
          text: "Mật khẩu không trùng khớp",
          icon: "error",
          confirmButtonText: "Xác nhận",
        });
        return;
      }
      //Add new user
      let user = {
        id: id,
        ...values,
        trangThai: values.tinhTrang === '0' ? false : true,
      };
      delete user.nhapLaiMatKhau;
      delete user.tinhTrang;

      UserServices.updateUser(user);
      Swal.fire({
        title: "Success!",
        text: "Đã cập nhật tài khoản",
        icon: "success",
        confirmButtonText: "Xác nhận",
      });
      //Add user log
      let ipv4 = await fetchIP()
      LogServices.addNewLog({
        action : `Cập nhật tài khoản ${user?.tenDangNhap}`,
        actionTime : new Date(),
        ip :ipv4.IPv4,
        tenDangNhap : me ?  me.tenDangNhap : 'Unknown'
      })
    }
  };
  const handelBackHome = ()=>{
    history('/user-management')
  }
  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] xl:pr-2 md:mt-3 relative user-update">
      <div className="path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-4">
        Cài đặt hệ thống &gt; Quản lý tài khoản &gt;{" "}
        <span className="text-primary-500 text-xl leading-[30px] font-bold">
          Cập nhật tài khoản
        </span>
      </div>
      <h2 className="text-primary-500 text-2xl font-bold">Quản lý tài khoản</h2>
      <div className="py-2 px-6 xl:overflow-y-scroll xl:max-h-[80vh] rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]">
        <Form
          validateMessages={validateMessages}
          form={form}
          className=""
          onFinish={onFinish}
        >
          <Row gutter={{ lg: 32 }}>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Họ tên"
                name="hoTen"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name!",
                  },
                  {
                    min: 6,
                    message: "Enter string have least 6 letters!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập họ tên"
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Tên đăng nhập"
                name="tenDangNhap"
                rules={[
                  {
                    required: true,
                    message: "Please input your login name!",
                  },
                  {
                    min: 6,
                    message: "Enter string have least 6 letters!",
                  },
                  {
                    pattern: new RegExp(/^\S*$/g),
                    message: "Don't allow whitespace!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập tên đăng nhập"
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Số điện thoại"
                name="soDienThoai"
                rules={[
                  {
                    pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                    message: "Wrong format!",
                  },
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Mật khẩu"
                name="matKhau"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Enter password have least 6 letters!",
                  },
                ]}
              >
                <Input.Password
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                  {
                    type: "email",
                    message: "Wrong format!",
                  },
                ]}
              >
                <Input
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập email"
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Nhập lại mật khẩu"
                name="nhapLaiMatKhau"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Enter password have least 6 letters!",
                  },
                ]}
              >
                <Input.Password
                  className="w-full h-11 rounded-lg hover:border-primary"
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Vai trò"
                name="vaiTro"
                rules={[
                  {
                    required: true,
                    message: "Please input your role!",
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={"large"}
                  placeholder="Chọn loại vai trò"
                  className="w-full h-11"
                >
                  {roles &&
                    roles.map((role) => {
                      return <Option key={role.id}>{role.tenVaiTro}</Option>;
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Form.Item
                label="Tình trạng"
                name="tinhTrang"
                rules={[
                  {
                    required: true,
                    message: "Please input your status of the account!",
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={"large"}
                  placeholder="Chọn tình trạng"
                  className="w-full h-11"
                >
                  {childrens}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <span className="text-sm font-normal leading-5 text-primary-gray-300">
            <strong className="text-primary-red">* </strong>
            Là trường thông tin bắt buộc
          </span>
          <div className="flex justify-center items-center mt-6 gap-x-8">
          <Button
              className='custom w-[147px] text-primary rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white btn-cancel'
              onClick={handelBackHome}
            >
              Hủy bỏ
            </Button>
            <Button
              htmlType='submit'
              className='custom w-[147px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 '
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
