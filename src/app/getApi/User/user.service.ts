import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/modal/bills';
import { CTHD } from 'src/app/modal/CTHD';
import { Customer } from 'src/app/modal/customer';
import { BanhGioHang } from 'src/app/modal/GioHang';
import { user } from 'src/app/modal/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  HeaderUrl = "http://localhost:3000";
  constructor(
    public http: HttpClient,
  ) {}

  getUser(MaKH: any):Observable<Customer>{
    const url = this.HeaderUrl+"/detailkhachhang?MaKH="+MaKH;
    return this.http.get<Customer>(url)
  }

  getUserIndex(MaKH: any):Observable<user>{
    const url = this.HeaderUrl+"/detailkhachhang?MaKH="+MaKH;
    return this.http.get<user>(url)
  }

  putUser(MaKH: any,TenKH:any,SDT: any,Email:any,DiaChi: any,Phuong: any,Quan: any,ThanhPho:any,body: Customer):Observable<Customer>{
    const url = this.HeaderUrl+"/suaKhachHangDatHang?MaKH="+MaKH+"&TenKH="+TenKH+"&SDT="+SDT+"&Email="+Email+"&DiaChi="+DiaChi+"&Phuong="+Phuong+"&Quan="+Quan+"&ThanhPho="+ThanhPho;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Customer>(url,body,http);
  }

  suaKhachHang(MaKH: any,NgaySinh: any,GioiTinh: any,SDT: any,Email: any,Anh: any,DiaChi: any,Phuong: any,Quan: any,ThanhPho: any,body: Customer):Observable<Customer>{
    const url = this.HeaderUrl+"/suaKhachHang?MaKH="+MaKH+"&NgaySinh="+NgaySinh+"&GioiTinh="+GioiTinh+"&SDT="+SDT+"&Email="+Email+"&Anh="+Anh+"&DiaChi="+DiaChi+"&Phuong="+Phuong+"&Quan="+Quan+"&ThanhPho="+ThanhPho;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Customer>(url,body,http);
  }

  suaMatKhau(MaKH: any,MatKhau: any,body: Customer):Observable<Customer>{
    const url = this.HeaderUrl+"/suaMatKhau?MaKH="+MaKH+"&MatKhau="+MatKhau;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Customer>(url,body,http);
  }

  postBill(MaHD: any,MaKH: any,PhuongThucThanhToan: any,GhiChu: any,body: Bill):Observable<Bill>{
    const url = this.HeaderUrl+"/putBill?MaHD="+MaHD+"&MaKH="+MaKH+"&PhuongThucThanhToan="+PhuongThucThanhToan+"&GhiChu="+GhiChu;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<Bill>(url,body,http);
  }

  postDetailBill(MaHD: any,MaKT_Banh: any,SL: any,body: CTHD):Observable<CTHD>{
    const url = this.HeaderUrl+"/postDetailBill?MaHD="+MaHD+"&MaKT_Banh="+MaKT_Banh+"&SL="+SL;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<CTHD>(url,body,http);
  }

  getMaHDMax():Observable<Bill>{
    const url = this.HeaderUrl+"/getMaHDMax";
    return this.http.get<Bill>(url)
  }

  getHSDMin(MaBanh: any,MaKT: any):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/getHSDMin?MaBanh="+MaBanh+"&MaKT="+MaKT;
    return this.http.get<BanhGioHang>(url)
  }

  getMaCTPNMin(MaBanh: any,MaKT: any,HSD: any):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/getMaCTPNMin?MaBanh="+MaBanh+"&MaKT="+MaKT+"&HSD="+HSD;
    return this.http.get<BanhGioHang>(url)
  }

  putSLTon(SLTon: any,MaKT_Banh:any,HSD: any,MaCTPN:any,body: BanhGioHang):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/putSLTon?SLTon="+SLTon+"&MaKT_Banh="+MaKT_Banh+"&HSD="+HSD+"&MaCTPN="+MaCTPN;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<BanhGioHang>(url,body,http);
  }

  checkLogin(TenKH: any,MatKhau: any):Observable<user>{
    const url = this.HeaderUrl+"/checkLoginUser?TenKH="+TenKH+"&MatKhau="+MatKhau;
    return this.http.get<user>(url)
  }

  postDangKy(TenKH: any,NgaySinh: any,GioiTinh: any,SDT: any,Email: any,DiaChi: any,Phuong: any,Quan: any,ThanhPho: any,MatKhau: any,body: Customer):Observable<Customer>{
    const url = this.HeaderUrl+"/dangKy?TenKH="+TenKH+"&NgaySinh="+NgaySinh+"&GioiTinh="+GioiTinh+"&SDT="+SDT+"&Email="+Email+"&DiaChi="+DiaChi+"&Phuong="+Phuong+"&Quan="+Quan+"&ThanhPho="+ThanhPho+"&MatKhau="+MatKhau;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<Customer>(url,body,http);
  }
}
