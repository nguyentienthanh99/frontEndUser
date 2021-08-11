import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill, CTHDUser } from 'src/app/modal/bills';

@Injectable({
  providedIn: 'root'
})
export class HoaDonService {
  HeaderUrl = "http://localhost:3000";
  constructor(
    public http: HttpClient,
  ) { }
  
  getListLichSuMuaHang(MaKH: any):Observable<Bill[]>{
    const url = this.HeaderUrl+"/getListLichSuMuaHang?MaKH="+MaKH;
    return this.http.get<Bill[]>(url)
  }

  getListDangGiaoHang(MaKH: any):Observable<Bill[]>{
    const url = this.HeaderUrl+"/getListDangGiaoHang?MaKH="+MaKH;
    return this.http.get<Bill[]>(url)
  }

  getListLichDangChoXacNhan(MaKH: any):Observable<Bill[]>{
    const url = this.HeaderUrl+"/getListLichDangChoXacNhan?MaKH="+MaKH;
    return this.http.get<Bill[]>(url)
  }

  getListCTHD(MaHD: any):Observable<CTHDUser[]>{
    const url = this.HeaderUrl+"/getCTHD?MaHD="+MaHD;
    return this.http.get<CTHDUser[]>(url)
  }
}
