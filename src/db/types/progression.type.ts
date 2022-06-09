export enum TrangThai {
  PENDING = "pending",
  USED = "used",
  REMOVE = "remove",
}
export enum NguonCap {
  KIOSK = "Kiosk",
  SYSTEM = "Hệ thống",
}
export default interface Progression {
  id?:string;
  stt: string;
  hoTen: string;
  soDienThoai: string;
  email: string;
  dichVu: string;
  thoiGianCap: Date;
  hanSuDung: Date;
  trangThai: TrangThai;
  nguonCap: NguonCap;
  tenDichVu?:string;
}
