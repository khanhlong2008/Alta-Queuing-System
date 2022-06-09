// PROGRESSION MODEL
/** Schema --->
  stt: String Number (key),
	hoTen: String ,
	soDienThoai : String VietNamese Phone,
	email: Email | null,
	dichVu : maDichVu reference from DichVu
	thoiGianCap: DateTime,
	hanSuDung: DateTime ( Default 1 day remain),
	tinhTrang: pending | used | remove,
	nguonCap: Kiosk | Hệ thống
 */
    import { doc,setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
    import firebase from "../firebase";
    import IProgression from "../types/progression.type";
    
    const db = collection(firebase,'progression')
    
    class ProgressionServices{
      addNewProgression = async (progression: IProgression) => {
        await setDoc(doc(db), progression);
      };
      
      getProgressions = async () => {
        let services : IProgression[] = []
        const querySnapshot = await getDocs(db);
        querySnapshot.forEach((doc: any) => {
          let temp = doc.data()
          let progression : IProgression= {
            id: doc.id,
            dichVu : temp.dichVu,
            email : temp.email,
            stt : temp.stt,
            hanSuDung : temp.hanSuDung,
            hoTen : temp.hoTen,
            nguonCap : temp.nguonCap,
            soDienThoai : temp.soDienThoai,
            thoiGianCap : temp.thoiGianCap,
            trangThai : temp.trangThai
          }
          services.push(progression)
        });
        return services
      };
    }
    export default new ProgressionServices()
    