import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modal/product';
import { saleOff } from 'src/app/modal/sale-offs';

@Injectable({
  providedIn: 'root'
})
export class KhuyenMaiService {
  HeaderUrl = "http://localhost:3000";
  constructor(
    public http: HttpClient,
  ) { }

  getDetailKM(MaKM: any):Observable<saleOff>{
    const url = this.HeaderUrl+"/detailKhuyenMai?MaKM="+MaKM;
    return this.http.get<saleOff>(url)
  }

  getBanhKM(MaKM: any):Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanhKM?MaKM="+MaKM;
    return this.http.get<Product[]>(url)
  }
}
