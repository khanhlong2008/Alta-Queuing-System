import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Space,
  Row,
  Col,
  Checkbox,
  Button,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ServiceServices from "../../../../db/services/service.services";
import IService from "../../../../db/types/service.type";
import Swal from "sweetalert2";
import LogServices from "../../../../db/services/log_system.services";
import { useAppSelector} from "../../../../app/hooks";
import { selectUser } from "../../../../features/user/userSlice";
import { fetchIP } from "../../../../db/others/ipaddress";
type Props = {};
interface SizeTwo<T> {
  0: T;
  1: T;
}
type CapSo = {
  autoIncrease: SizeTwo<string>,
  prefix : string,
  surfix : string,
  resetEveryDay : boolean
}
/* eslint-disable no-template-curly-in-string */
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

const AddService = (props: Props) => {
  const [form] = Form.useForm();
  const {id} = useParams()
  const [services, setServices] = useState<IService[]>()
  const [serviceUpdate, setServiceUpdate] = useState<IService>()
  
  const me = useAppSelector(selectUser)
  
  const history = useNavigate()
  useEffect(() => {
    (async()=>{
      let data = await ServiceServices.getServices()
      let index = data.findIndex(item=>item.id === id)
      if(index===-1){
        history('/services-management')
      }else{
        setServices(data)
        setServiceUpdate(data[index])
        let temp = {...data[index]}
        form.setFieldsValue({
          auto: { checked: temp.autoIncrease[0] !== '' ? true:false, start: temp.autoIncrease[0] !== '' ? temp.autoIncrease[0]:'0001', end: temp.autoIncrease[1] !== '' ? temp.autoIncrease[1]:'9999' },
          maDichVu: temp.maDichVu,
          moTa: temp.moTa,
          prefix: { checked: temp.prefix !== '' ? true:false , start: temp.prefix !== '' ? temp.prefix :"0001" },
          reset: temp.resetEveryDay,
          surfix: { checked: temp.surfix !== '' ? true:false , start: temp.surfix !== '' ? temp.surfix :"0001" },
          tenDichVu: temp.tenDichVu,
        });
      }
    })()
  }, []);

  const handleFormChange = (e: any) => {
    if (e.target.id === "nest-messages_dichvu_maDv") {
      console.log(e.target.value);
    }
  };
  const onFinish = async(values: any) => {
    let {auto,maDichVu,moTa,prefix,surfix,reset, tenDichVu} = values
    let capSo:CapSo = {
      autoIncrease: ['',''],
      prefix : '',
      surfix : '',
      resetEveryDay : reset
    };
    if (auto.checked) {
      capSo.autoIncrease=[auto.start,auto.end]
    }
    if (prefix.checked) {
      capSo.prefix=prefix.start
    }
    if (surfix.checked) {
      capSo.surfix=surfix.start
    }
    let service : IService = {
      ...capSo,
      maDichVu,
      moTa,
      tenDichVu,
      trangThai: true,
      id
    }
    let index = services?.filter(item=>item.id !== serviceUpdate?.id ).findIndex(item=>item.maDichVu === service.maDichVu)
    if(index!==-1){
      Swal.fire({
        title: "Error!",
        text: "M?? d???ch v??? ???? t???n t???i",
        icon: "error",
        confirmButtonText: "X??c nh???n",
      });
      return
    }
    ServiceServices.updateService(service)
    Swal.fire({
      title: "Success!",
      text: "C???p nh???t d???ch v??? th??nh c??ng",
      icon: "success",
      confirmButtonText: "X??c nh???n",
    });
    //Add user log
    let ipv4 = await fetchIP()
    LogServices.addNewLog({
      action : `C???p nh???t d???ch v??? ${service.maDichVu}`,
      actionTime : new Date(),
      ip :ipv4.IPv4,
      tenDangNhap : me ?  me.tenDangNhap : 'Unknown'
    })
  };
  const handleCancel = ()=>{
    history('/services-management')
  }
  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:pt-10 relative service-add">
      <div className="path text-gray-600 font-bold text-lg mb-11 ">
        D???ch v??? &gt; Danh s??ch d???ch v??? &gt;{" "}
        <span className="text-primary font-bold">C???p nh???t d???ch v???</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Qu???n l?? d???ch v???</h2>
      <div className="w-full h-full add-content">
        <h3 className="text-primary text-lg font-bold mb-3">
          Th??ng tin d???ch v???
        </h3>
        <Form
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          onChange={handleFormChange}
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                name={["maDichVu"]}
                label="M?? d???ch v???:"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? d???ch v???",
                  },
                  {
                    pattern: new RegExp(/^\d{3}$/gm),
                    message: "Wrong format! Examples: 2xx, 201, 202, 102",
                  },
                ]}
              >
                <Input className="py-[10px] pl-3" />
              </Form.Item>
              <Form.Item
                name={["tenDichVu"]}
                label="T??n d???ch v???:"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p t??n d???ch v???",
                  },
                ]}
              >
                <Input className="py-[10px] pl-3" />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                name={["moTa"]}
                label="M?? t???:"
                className="textarea"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? t??? d???ch v???",
                  },
                ]}
              >
                <Input.TextArea className="py-[10px] pl-3 lg:block lg:ml-auto" />
              </Form.Item>
            </Col>
          </Row>
          <h3 className="text-primary text-lg font-bold mb-3">
            Quy t???c c???p s???
          </h3>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Form.Item name={["auto", "checked"]} valuePropName="checked">
                    <Checkbox style={{ lineHeight: "32px" }} />
                  </Form.Item>
                  <span className="flex items-center h-[32px] mb-[24px] mx-1">
                    T??ng t??? ?????ng t???:
                  </span>
                </div>
                <div className="flex items-center">
                  <Form.Item
                    name={["auto", "start"]}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: "Nh???p chu???i s??? c?? 4 ch??? s???!",
                      },
                    ]}
                  >
                    <Input className="rounded-lg inlineInput" />
                  </Form.Item>
                  <span className="flex items-center  h-[32px] mb-[24px] mx-1">
                    ?????n
                  </span>
                  <Form.Item
                    name={["auto", "end"]}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: "Nh???p chu???i s??? c?? 4 ch??? s???!",
                      },
                    ]}
                  >
                    <Input className="rounded-lg inlineInput" />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Form.Item
                    name={["prefix", "checked"]}
                    valuePropName="checked"
                  >
                    <Checkbox style={{ lineHeight: "32px" }} />
                  </Form.Item>
                  <span className="flex items-center h-[32px] mb-[24px] mx-1 w-[102px]">
                    Prefix:
                  </span>
                </div>
                <div className="flex items-center">
                  <Form.Item
                    name={["prefix", "start"]}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: "Nh???p chu???i s??? c?? 4 ch??? s???!",
                      },
                    ]}
                  >
                    <Input className="rounded-lg inlineInput" />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Form.Item
                    name={["surfix", "checked"]}
                    valuePropName="checked"
                  >
                    <Checkbox style={{ lineHeight: "32px" }} />
                  </Form.Item>
                  <span className="flex items-center h-[32px] mb-[24px] mx-1 w-[102px]">
                    Surfix:
                  </span>
                </div>
                <div className="flex items-center">
                  <Form.Item
                    name={["surfix", "start"]}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: "Nh???p chu???i s??? c?? 4 ch??? s???!",
                      },
                    ]}
                  >
                    <Input className="rounded-lg inlineInput" />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <Form.Item name={["reset"]} valuePropName="checked">
                <Checkbox style={{ lineHeight: "32px" }}>
                  Reset m???i ng??y
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <span>
            <span className="text-primary">*</span> l?? tr?????ng th??ng tin b???t bu???c
          </span>
          <Space align="center" className=" flex justify-center w-full md:mt-5">
          <Button
                    className='custom w-[147px] text-primary rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white btn-cancel'
                    onClick={handleCancel}
                  >
                    H???y b???
                  </Button>
                  <Button
                    htmlType='submit'
                    className='custom w-[147px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400 '
                  >
                    C???p nh???t
                  </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default AddService;
