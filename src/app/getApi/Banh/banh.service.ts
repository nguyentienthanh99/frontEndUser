import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modal/product';
import { KichThuocBanh } from 'src/app/modal/KichThuoc';
import { TypeProduct } from 'src/app/modal/type-product';
import { saleOff } from 'src/app/modal/sale-offs';
import { NhaCungCap } from 'src/app/modal/nhacungcap';

@Injectable({
  providedIn: 'root',
})
export class BanhService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }

  getBanh():Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanh";
    return this.http.get<Product[]>(url)
  }

  getNCC():Observable<NhaCungCap[]>{
    const url = this.HeaderUrl+"/listNCC";
    return this.http.get<NhaCungCap[]>(url)
  }

  getBanhNCC(MaNCC: any):Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanhCungNCC?MaNCC="+MaNCC;
    return this.http.get<Product[]>(url)
  }

  getKichThuocBanh(MaBanh: any):Observable<KichThuocBanh[]>{
    const url = this.HeaderUrl+"/listKichThuocCuaBanh?MaBanh="+MaBanh;
    return this.http.get<KichThuocBanh[]>(url)
  }

  getTenKichThuocBanh(MaBanh: any):Observable<KichThuocBanh[]>{
    const url = this.HeaderUrl+"/listTenKichThuocCuaBanh?MaBanh="+MaBanh;
    return this.http.get<KichThuocBanh[]>(url)
  }

  getLoaiBanh():Observable<TypeProduct[]>{
    const url = this.HeaderUrl+"/listLoaiBanh";
    return this.http.get<TypeProduct[]>(url)
  }

  getKhuyenMai():Observable<saleOff[]>{
    const url = this.HeaderUrl+"/allKhuyenMai";
    return this.http.get<saleOff[]>(url)
  }

  getChiTietBanh(MaBanh: any):Observable<Product>{
    const url = this.HeaderUrl+"/detailBanh?MaBanh=" + MaBanh;
    return this.http.get<Product>(url)
  }

  getBanhCungLoai(MaLoaiBanh: any):Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanhCungLoai?MaLoaiBanh="+MaLoaiBanh;
    return this.http.get<Product[]>(url)
  }

  getBanhSearch(TenBanh: any):Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanhSearch?TenBanh="+TenBanh;
    return this.http.get<Product[]>(url)
  }
}
