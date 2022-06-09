// ROLE MODEL
/** Schema --->
	id: String (key),
	tenVaiTro: String,
	moTa: String,
 */
import { doc,updateDoc,getDocs,setDoc, collection} from "firebase/firestore";
import firebase from "../firebase";
import IRole from "../types/role.type";

let db = collection(firebase,'role')

class RoleServices{
  addNewRole = async (role: IRole) => {
    await setDoc(doc(db), role);
  };
  
  getRoles = async () => {
    let roles : IRole[] = []
    const querySnapshot = await getDocs(db);
    querySnapshot.forEach((doc: any) => {
      let temp = doc.data()
      let role : IRole= {
        id: doc.id,
        tenVaiTro: temp.tenVaiTro,
        moTa : temp.moTa
      }
      roles.push(role)
    });
    return roles
  };
   updateRole = async (role: IRole) => {
     let {tenVaiTro, moTa}=role
     const docRef = doc(db,role.id)
    const updated = await updateDoc(docRef,{
      tenVaiTro,
      moTa
    });
    return updated
  };
}
export default new RoleServices()
