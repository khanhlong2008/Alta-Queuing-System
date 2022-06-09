// USER MODEL
/** Schema --->
 * tenDangNhap: String (key)
	hoTen: String
	soDienThoai: String VietNamese Phone
	email: Email (unique)
  matKhau: String
	vaiTro: id reference from Role
	trangThai: Boolean
 */
import { doc,updateDoc,setDoc, collection, getDocs, query, where } from "firebase/firestore";
import firebase from "../firebase";
import IUser from "../types/user.type";

const db = collection(firebase,'user')

class UserServices{
  addNewUser = async (user: IUser) => {
    user.avatar = "https://firebasestorage.googleapis.com/v0/b/queuing-system-160d8.appspot.com/o/default.png?alt=media&token=66012b25-c61c-48d4-a8bf-4cc1bec2e428"
    await setDoc(doc(db), user);
  };
  
  getUsers = async () => {
    let users : IUser[] = []
    const querySnapshot = await getDocs(db);
    querySnapshot.forEach((doc: any) => {
      let temp = doc.data()
      let user : IUser= {
        id: doc.id,
        tenDangNhap :temp.tenDangNhap,
        hoTen :temp.hoTen,
        email :temp.email,
        matKhau :temp.matKhau,
        soDienThoai :temp.soDienThoai,
        trangThai :temp.trangThai,
        vaiTro :temp.vaiTro,
        avatar : temp.avatar
      }
      users.push(user)
    });
    return users
  };
   updateUser = async (user: IUser) => {
    const docRef = doc(db,user.id)
    let temp = {...user}
    delete temp.id
    const updated = await updateDoc(docRef,{
      ...temp  
    });
    return updated
  };
  login = async(tenDangNhap:string, matKhau:string)=>{
    const q = query(db, where("tenDangNhap", "==", tenDangNhap), where("matKhau", "==", matKhau));
    const querySnapshot = await getDocs(q);
    let temp = null
    querySnapshot.forEach((doc) => {
      temp = {
       ...doc.data(),
       id: doc.id
     };
    });
    return temp
  }
}
export default new UserServices()
