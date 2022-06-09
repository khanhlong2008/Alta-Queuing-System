import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Upload, Button } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import './style.scss';
import UserService from "../../../db/services/user.services";
import RoleService from "../../../db/services/role.services";
import {dbFileStorage} from "../../../db/firebase";

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {  useAppSelector,useAppDispatch } from "../../../app/hooks";
import { selectUser,updateUser } from "../../../features/user/userSlice"
import moment from "moment-timezone";
import Swal from "sweetalert2";
type LayoutType = Parameters<typeof Form>[0]['layout'];

const Profile = () => {
  const [form] = Form.useForm();
  const me = useAppSelector(selectUser)
  const [block, setBlock] = useState(false)
  const dispatch = useAppDispatch()
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const handleImage = async(e: any) => {
    e.preventDefault();
    let pickedFile;
    if (e.target.files && e.target.files.length > 0) {
      pickedFile = e.target.files[0];
      setBlock(true)
      if(pickedFile){
        await uploadLoadAvatar(pickedFile)
        setBlock(false)
      }else{
        Swal.fire({
          title: "Error!",
          text: "Có lỗi xảy ra khi upload. Vui lòng thử lại!",
          icon: "error",
          confirmButtonText: "Xác nhận",
        });
        setBlock(false)
      }
    }
  };
const uploadLoadAvatar = async (singleImage : any) => {
  const storageRef = ref(dbFileStorage,moment().format('DDMMYYYHHmmss'));
  const uploadTask = uploadBytesResumable(storageRef, singleImage,{
    contentType: 'image/*',
  });
  uploadTask.on(
    'state_changed',
    (snapshot: any) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error: any) => {
      Swal.fire({
        title: "Error!",
        text: "Có lỗi xảy ra khi upload. Vui lòng thử lại!",
        icon: "error",
        confirmButtonText: "Xác nhận",
      });
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
        if (me) {
          await UserService.updateUser({
           ...me,
            avatar: downloadURL,
          })
          Swal.fire({
            title: "Error!",
            text: "Cập nhật hình thành công!",
            icon: "success",
            confirmButtonText: "Xác nhận",
          });
          dispatch(
            updateUser({
              ...me,
              avatar: downloadURL,
            }),
          );
        }
      });
    },
  );
};
  
  useEffect(() => {
    (async()=>{
      let roles = await RoleService.getRoles()
      let role = roles.find(item=>item.id === me?.vaiTro)
      form.setFieldsValue({
        username: me?.hoTen,
        phoneNumber: me?.soDienThoai,
        email: me?.email,
        loginName: me?.tenDangNhap,
        password: me?.matKhau || '123123123',
        role: role?.tenVaiTro,
      });
    })()
    
  }, [me]);
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-[24px] relative profile'>
      <div className='path text-primary-400 font-bold text-lg mb-20'>
        Thông tin cá nhân
      </div>
      <div className='py-10 px-4 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)] bg-white lg:overflow-y-scroll lg:h-[85vh]'>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
        >
          <Row gutter={{ sm: 16, md: 24, lg: 32 }}>
            <Col className='gutter-row' xs={24} sm={24}  lg={8} md={24}>
              <div className='relative flex flex-col justify-center items-center'>
                <div className='lg:w-40 lg:h-40 w-[248px] h-[248px] text-center relative'>
                  <img
                    className='w-full h-full object-cover rounded-[318px]'
                    src={me?.avatar}
                    alt='avatar'
                  />
                  <div
                    className='upload absolute w-11 h-11 -bottom-2 left-3/4 -translate-x-3/4 bg-primary border-2 border-solid border-white flex justify-center items-center rounded-full cursor-pointer'
                  >
                    <label className='absolute w-full h-full top-[5%]'>
                      <CameraOutlined className='text-2xl text-white'/>
                    </label>
                    <input
                      className='absolute z-9999 opacity-0 cursor-pointer'
                      type='file'
                      disabled={block}
                      onChange={handleImage}
                    />
                  </div>
                  
                </div>
                <h2 className='mt-5 text-center text-2xl font-bold leading-9 text-primary-gray-500'>
                  {me?.hoTen}
                </h2>
              </div>
            </Col>
            <Col sm={24} lg={8} md={24}>
              <Form.Item
                label='Tên người dùng'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='username'
              >
                <Input placeholder='username' disabled />
              </Form.Item>
              <Form.Item
                label='Số điện thoại'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='phoneNumber'
              >
                <Input placeholder='0392680723' disabled />
              </Form.Item>
              <Form.Item
                label='Email'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='email'
              >
                <Input placeholder='example@gmail.com' disabled />
              </Form.Item>
            </Col>
            <Col sm={24} lg={8} md={24}>
              <Form.Item
                label='Tên đăng nhập'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='loginName'
              >
                <Input placeholder='lehuynhaivan2000' disabled />
              </Form.Item>
              <Form.Item
                label='Mật khẩu'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='password'
              >
                <Input placeholder='huynhleaivan@123' disabled className='' />
              </Form.Item>
              <Form.Item
                label='Vai trò'
                className='text-base font-semibold leading-6 text-primary-gray-500'
                name='role'
              >
                <Input placeholder='Front-End Developer' disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
