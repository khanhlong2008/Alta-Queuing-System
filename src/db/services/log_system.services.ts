// LOG SYSTEM MODEL
/** Schema --->
 *Id: String (Key)
	tenDangNhap : reference from User
	actionTime: DateTime
	Ip: IP format String
	Action: String
 */
    import { doc,setDoc, collection, getDocs } from "firebase/firestore";
    import firebase from "../firebase";
    import ILogSystem from "../types/log_system.type";
    
    const db = collection(firebase,'log-system')
    
    class LogSystemServices{
      addNewLog = async (log: ILogSystem) => {
        await setDoc(doc(db), log);
      };
      
      getLogs = async () => {
        let logs : ILogSystem[] = []
        const querySnapshot = await getDocs(db);
        querySnapshot.forEach((doc: any) => {
          let temp = doc.data()
          let log : ILogSystem= {
            id: doc.id,
            tenDangNhap :temp.tenDangNhap,
            action: temp.action,
            actionTime: temp.actionTime,
            ip: temp.ip
          }
          logs.push(log)
        });
        return logs
      };
    }
    export default new LogSystemServices()
    