// SERVICE MODEL
/** Schema --->
  id: String (key),
	tenDichVu: String ,
	moTa: String,
	autoIncrease: [min,max],
	prefix: String,
	surfix: String,
  resetEveryDay: Boolean
 */
    import { doc,setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
    import firebase from "../firebase";
    import IService from "../types/service.type";
    
    const db = collection(firebase,'service')
    
    class ServiceServices{
      addNewService = async (service: IService) => {
        await setDoc(doc(db), service);
      };
      
      getServices = async () => {
        let services : IService[] = []
        const querySnapshot = await getDocs(db);
        querySnapshot.forEach((doc: any) => {
          let temp = doc.data()
          let service : IService= {
            id: doc.id,
            maDichVu: temp.maDichVu,
            moTa :temp.moTa,
            tenDichVu: temp.tenDichVu,
            prefix: temp.prefix,
            surfix: temp.surfix,
            autoIncrease: temp.autoIncrease,
            resetEveryDay: temp.resetEveryDay,
            trangThai: temp.trangThai
          }
          services.push(service)
        });
        return services
      };
      updateService = async (service: IService) => {
        const docRef = doc(db,service.id)
        let temp = {...service}
        delete temp.id
        const updated = await updateDoc(docRef,{
          ...temp  
        });
        return updated
      };
    }
    export default new ServiceServices()
    