import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BanhGioHang, BanhMax } from 'src/app/modal/GioHang';

@Injectable({
  providedIn: 'root'
})
export class GioHangService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }

  getBanhGioHang(MaKH: any):Observable<BanhGioHang[]>{
    const url = this.HeaderUrl+"/getGioHang?MaKH="+MaKH;
    return this.http.get<BanhGioHang[]>(url)
  }
  
  getSLBanhMax(MaBanh: any,MaKT: any):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/getSLBanhMax?MaBanh="+MaBanh+"&MaKT="+MaKT;
    return this.http.get<BanhGioHang>(url)
  }

  putTangSL(SL: any,MaKH:any,MaKT_Banh: any,MaGH: any,body: BanhGioHang):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/tangSL?SL="+SL+"&MaKH="+MaKH+"&MaKT_Banh="+MaKT_Banh+"&MaGH="+MaGH;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<BanhGioHang>(url,body,http);
  }

  deleteTungSP(MaKH:any,MaKT_Banh: any):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/deleteTungSPGioHang?MaKH="+MaKH+"&MaKT_Banh="+MaKT_Banh;
    return this.http.delete<BanhGioHang>(url);
  }

  deleteGioHang(MaKH:any):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/deleteGioHang?MaKH="+MaKH;
    return this.http.delete<BanhGioHang>(url);
  }

  themSPVaoGioHang(MaKH: any,MaKT_Banh:any,SL: any,body: BanhGioHang):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/themSPVaoGioHang?MaKH="+MaKH+"&MaKT_Banh="+MaKT_Banh+"&SL="+SL;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<BanhGioHang>(url,body,http);
  }

  getMaKTBanh(MaBanh: any,MaKT: any):Observable<BanhGioHang>{
    const url = this.HeaderUrl+"/getMaKTBanh?MaBanh="+MaBanh+"&MaKT="+MaKT;
    return this.http.get<BanhGioHang>(url)
  }

}
