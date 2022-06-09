// DEVICESdwwww MODEL
/** Schema --->
   maThietBi: String (key),
	tenThietBi: String ,
	tenDangNhap: String ,
	ip: String Ip format ,
  trangThai : Boolean,
	matKhau: String,
	dichVuSD: [maDichVu reference from DichVu ],
	loaiThietBi : Kiosk | Display Counter
 */
    import { doc,setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
    import firebase from "../firebase";
    import IDevice from "../types/device.type";
    
    const db = collection(firebase,'device')
    
    class DeviceServices{
      addNewDevice = async (device: IDevice) => {
        await setDoc(doc(db), device);
      };
      
      getDevices = async () => {
        let devices : IDevice[] = []
        const querySnapshot = await getDocs(db);
        querySnapshot.forEach((doc: any) => {
          let temp = doc.data()
          let service : IDevice= {
            id: doc.id,
            maThietBi: temp.maThietBi,
            dichVuSuDung: temp.dichVuSuDung,
            ip: temp.ip,
            loaiThietBi: temp.loaiThietBi,
            matKhau: temp.matKhau,
            tenDangNhap: temp.tenDangNhap,
            tenThietBi : temp.tenThietBi,
            trangThaiHoatDong: temp.trangThaiHoatDong,
            trangThaiKetNoi: temp.trangThaiKetNoi,
          }
          devices.push(service)
        });
        return devices
      };
      updateDevice = async (device: IDevice) => {
        const docRef = doc(db,device.id)
        let temp = {...device}
        delete temp.id
        const updated = await updateDoc(docRef,{
          ...temp  
        });
        return updated
      };
    }
    export default new DeviceServices()
    