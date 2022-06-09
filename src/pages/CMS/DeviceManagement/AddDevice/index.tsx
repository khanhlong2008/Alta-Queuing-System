import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, message, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
import DeviceServices from "../../../../db/services/device.services";
import IDevice from "../../../../db/types/device.type";
import ServiceServices from "../../../../db/services/service.services";
import IService from "../../../../db/types/service.type";
import Swal from "sweetalert2";
import { useAppSelector} from "../../../../app/hooks";
import { selectUser } from "../../../../features/user/userSlice";
import LogServices from "../../../../db/services/log_system.services";
import { fetchIP } from "../../../../db/others/ipaddress";
import { useNavigate } from 'react-router-dom';

const AddDevice = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [devices, setDevices] = useState<IDevice[]>([])
  const [services, setServices] = useState<IService[]>([])
  const me = useAppSelector(selectUser)
  const history = useNavigate()
  useEffect(() => {
    //Data demo
    (async()=>{
      let data1 = await DeviceServices.getDevices()
      setDevices(data1)
      let data2 = await ServiceServices.getServices()
      setServices(data2)
      })()
  }, []);
  
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  const deciceList = ['Kiosk','Display counter'];
  const children = [];
  for (let i = 0; i < deciceList.length; i++) {
    children.push(<Option key={deciceList[i]}>{deciceList[i]}</Option>);
  }
  const onFinish = async(values: any) => {
    let device : IDevice = {
      ...values,
      trangThaiHoatDong: true,
      trangThaiKetNoi :true
    }
    let index = devices?.findIndex(item=>item.maThietBi === device.maThietBi)
    if(index!==-1){
      Swal.fire({
        title: "Error!",
        text: "Mã thiết bị đã tồn tại",
        icon: "error",
        confirmButtonText: "Xác nhận",
      });
      return
    }
    DeviceServices.addNewDevice(device)
    Swal.fire({
      title: "Success!",
      text: "Thêm thiết bị mới thành công",
      icon: "success",
      confirmButtonText: "Xác nhận",
    });
  let ipv4 = await fetchIP()
    LogServices.addNewLog({
      action : `Thêm thiết bị mới ${device.tenThietBi}`,
      actionTime : new Date(),
      ip :ipv4.IPv4,
      tenDangNhap : me ?  me.tenDangNhap : 'Unknown'
    })
  }
  const handleCancel = ()=>{
    history('/devices-management')
  }
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] relative'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-4'>
        Thiết bị &gt; Danh sách thiết bị &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          Thêm thiết bị
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold'>Quản lý thiết bị</h2>
      <div className='py-2 px-6 rounded-2xl add-device shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]'>
        <h3 className='text-xl font-bold leading-[30px] text-primary'>
          Thông tin thiết bị
        </h3>
        <Form
         name="nest-messages"
          onFinish={onFinish}
          form={form}>
          <Row gutter={{ lg: 32 }} >
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Mã thiết bị'
                name='maThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mã thiết bị!',
                  },
                  {
                    pattern: new RegExp(/^KIO_[0-9]{3}$/),
                    message : "Mã thiết bị có định dạng KIO_xxx vd: KIO_001"
                  }
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập mã thiết bị'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Loại thiết bị'
                name='loaiThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn loại thiết bị!',
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={'large'}
                  placeholder='Chọn loại thiết bị'
                  onChange={handleChange}
                  className='w-full h-11'
                >
                  {children}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Tên thiết bị'
                name='tenThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên thiết bị!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập tên thiết bị'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Tên đăng nhập'
                name='tenDangNhap'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập tài khoản'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Địa chỉ IP'
                name='ip'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ Ip của thiết bị!',
                  },
                  {
                    pattern: new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm),
                    message : 'Ip sai định dạng!'
                  }
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập địa chỉ IP'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12} >
              <Form.Item
                label='Mật khẩu'
                name='matKhau'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập mật khẩu'
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label='Dịch vụ sử dụng'
                name='dichVuSuDung'
                rules={[
                  {
                    required: true,
                    message: 'Please input your current service!',
                  },
                ]}
              >
                <Select
                  mode='multiple'
                  size='large'
                  className='w-full'
                >
                  {services &&  services.map(item=>{
                    return <Option key={item.maDichVu}>{item.tenDichVu}</Option>
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <span className='text-sm font-normal leading-5 text-primary-gray-300'>
            <strong className='text-primary-red'>* </strong>
            Là trường thông tin bắt buộc
          </span>
          <div className='flex justify-center items-center mt-6 gap-x-8'>
          <Button
                    className='custom w-[147px] text-primary rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white btn-cancel'
                    onClick={handleCancel}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    htmlType='submit'
                    className='custom w-[147px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 '
                  >
                    Thêm thiết bị
                  </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddDevice;
