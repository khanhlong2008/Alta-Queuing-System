export default interface Device {
  id?:string;
  maThietBi: string;
  tenThietBi: string;
  tenDangNhap: string;
  ip: string;
  trangThaiHoatDong: Boolean;
  trangThaiKetNoi: Boolean;
  matKhau: string;
  dichVuSuDung: string[];
  loaiThietBi: "Kiosk" | "Display Counter";
}
