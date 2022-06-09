import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Checkbox, Button } from 'antd';
import './style.scss';
import RoleServices from "../../../../db/services/role.services";
import IRole from "../../../../db/types/role.type";
import Swal from 'sweetalert2'
import LogSystemServices from '../../../../db/services/log_system.services';
import { fetchIP } from '../../../../db/others/ipaddress';
import { useAppSelector} from "../../../../app/hooks";
import { selectUser } from "../../../../features/user/userSlice";
import { useNavigate } from 'react-router-dom';
type Props = {};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
};

const AddOle = (props: Props) => {
  const [roles, setRoles]= useState<IRole[]>([])
  const me = useAppSelector(selectUser)
  const history = useNavigate()
  useEffect(() => {
    (async()=>{
    let data = await RoleServices.getRoles()
    setRoles(data)
    })()
  }, []);
//   const xoa_dau = (str:string) => {
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     str = str.replace(/đ/g, "d");
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
//     str = str.replace(/Đ/g, "D");
//     return str;
// }
  const onFinish = async (values : any)=>{
    // let index = roles.findIndex(item=> xoa_dau(item.tenVaiTro.toLocaleLowerCase()).includes(xoa_dau(values.tenVaiTro.toLocaleLowerCase())) )
    let role = {
      tenVaiTro : values.tenVaiTro,
      moTa : values.moTa ? values.moTa : "Trống"
    }
    RoleServices.addNewRole(role);
    Swal.fire({
      title: 'Success!',
      text: 'Đã tạo vai trò mới',
      icon: 'success',
      confirmButtonText: 'Xác nhận'
    })
    let ipv4 = await fetchIP()
      LogSystemServices.addNewLog({
        action : `Thêm vai trò ${role.tenVaiTro}`,
        actionTime : new Date(),
        ip :ipv4.IPv4,
        tenDangNhap : me ?  me.tenDangNhap : 'Unknown'
      })
  }
  const handelBackHome = ()=>{
    history('/ole-management')
  }
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:mt-3 relative ole-add'>
      <div className='path text-gray-600 font-bold text-lg mb-9'>
        Cài đặt hệ thống &gt; Quản lý vai trò &gt;{' '}
        <span className='text-primary font-bold'>Thêm vai trò</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-3'>
        Danh sách vai trò
      </h2>
      <div className='w-full h-full update-content'>
        <h3 className='text-primary text-lg font-bold mb-2'>
          Thông tin vai trò
        </h3>
        <Form onFinish={onFinish} name='nest-messages' validateMessages={validateMessages}>
          <Row gutter={[16, 16]}>
            <Col span={12} xs={24} lg={12} className='flex flex-col'>
              <Form.Item
                name={'tenVaiTro'}
                label='Tên vai trò'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên vai trò',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary'
                  placeholder='Nhập tên vai trò'
                />
              </Form.Item>
              <Form.Item
                name={'moTa'}
                label='Mô tả:'
                className='textarea'
              >
                <Input.TextArea rows={8} placeholder='Nhập thông tin mô tả' />
              </Form.Item>
              <span>
                <span className='text-primary'>*</span>Là trường thông tin bắt
                buộc
              </span>
            </Col>
            <Col
              span={12}
              xs={24}
              lg={12}
              className='bg-primary-organe-50 rounded-lg overflow-y-scroll max-h-[300px]'
            >
              <h3 className='text-primary text-lg font-bold mb-3'>
                Nhóm chức năng A
              </h3>
              <Form.Item>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Tất cả
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng x
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng y
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng z
                    </Checkbox>
                  </Col>
                </Row>
              </Form.Item>
              <h3 className='text-primary text-lg font-bold mb-3'>
                Nhóm chức năng B
              </h3>
              <Form.Item>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Tất cả
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng x
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng y
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng z
                    </Checkbox>
                  </Col>
                </Row>
              </Form.Item>
              <h3 className='text-primary text-lg font-bold mb-3'>
                Nhóm chức năng B
              </h3>
              <Form.Item>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Tất cả
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng x
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng y
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox className='text-base font-semibold leading-6'>
                      Chức năng z
                    </Checkbox>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className='flex justify-center items-center mt-3 gap-x-8'>
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
              Thêm
            </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddOle;
