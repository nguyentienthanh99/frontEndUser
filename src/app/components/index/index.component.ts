import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BanhService } from 'src/app/getApi/Banh/banh.service';
import { GioHangService } from 'src/app/getApi/GioHang/gio-hang.service';
import { UserService } from 'src/app/getApi/User/user.service';
import { BanhGioHang } from 'src/app/modal/GioHang';
import { user } from 'src/app/modal/login';
import { saleOff } from 'src/app/modal/sale-offs';
import { TypeProduct } from 'src/app/modal/type-product';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modal/product';
import { NhaCungCap } from 'src/app/modal/nhacungcap';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [BanhService,GioHangService,user,UserService],
})
export class IndexComponent implements OnInit{
  control = new FormControl();
  // cakes: any[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  cakes: Product[] = [];
  checkcake: any[] = [];
  filteredCake: any;
  title = 'user';
  test: any;
  id: any;
  LoaiBanhs: TypeProduct[] = [];
  KhyenMais: saleOff[] = [];
  listGioHang: BanhGioHang[] = [];
  listNCC: NhaCungCap[] = [];
  DemSLBanh: any = 0;
  checkKH: boolean = true;
  loai: any = "loaibanh";
  constructor(
    public acRouter: ActivatedRoute,
    public roter: Router,
    public Banhs: BanhService,
    public gioHang: GioHangService,
    public apiUser: UserService,
    public user: user,
  ) {
    this.id = this.acRouter.snapshot.queryParamMap.get('idKH');  
    this.getKH();
    this.getBanhGH();
    
    this.getAllKhuyenmai();
    this.getAllLoaiBanh();
    this.getListNCC();
    
   }

   ngOnInit(): void {
    this.getBanh();
    this.filteredCake = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   }

  private _filter(value: any): any[] {
    const filterValue = this._normalizeValue(value);
    return this.cakes.filter(cake => this._normalizeValue(cake.TenBanh).includes(filterValue));
  }

  private _normalizeValue(value: any): any {
      return value.toLowerCase().replace(/\s/g, '');
  }

  getBanh(){
    this.Banhs.getBanh().subscribe(result => {
      this.cakes = result;
    });
  }

  getListNCC(){
    this.Banhs.getNCC().subscribe(result => {
      this.listNCC = result;
    });
  }

  getBanhGH(){
    this.gioHang.getBanhGioHang(this.id).subscribe(result => {
      this.listGioHang = result;
      this.DemSLBanh = this.listGioHang.length;
    });
  }
  getAllLoaiBanh(){
    this.Banhs.getLoaiBanh().subscribe(result => {
      this.LoaiBanhs = result;
    });
  }

  getAllKhuyenmai(){
    this.Banhs.getKhuyenMai().subscribe(result => {
      this.KhyenMais = result;
    });
  }

  getKH(){
    if(this.id != null){
      this.apiUser.getUserIndex(this.id).subscribe(result => {
        this.user = result;
        this.checkKH = false;
      });
    }
  }

  logOut(){
    const conf = window.confirm("Bạn có muốn đăng xuất không ?");
    if(conf){
      this.roter.navigate(['index/all-cake'],{queryParams :{idKH : null}});
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }

  goToGioHang(){
    if(this.id != null){
      this.roter.navigate(['index/gio-hang'],{queryParams :{idKH : this.id}});
    }
    else{
      this.roter.navigate(['index/login']);
    }
  }

  trangChu(){
    if(this.id != null){
      this.roter.navigate(['index/all-cake'],{queryParams :{idKH : this.id}});
      setTimeout(() => {
        location.reload();
      }, 200);
    }
    else{
      this.roter.navigate(['index/all-cake']);
      setTimeout(() => {
        location.reload();
      }, 200);
    }
  }

  goToDetailUser(){
      this.roter.navigate(['index/chi-nguoi-dung'],{queryParams :{idKH : this.id}});
  }

  goToLogin(){
    this.roter.navigate(['index/login']);
  }

  goToLoaiBanh(idLoai: any){
    if(this.id == null){
      this.roter.navigate(['index/all-cake'],{queryParams :{idLoai: idLoai}});
    }
    if(this.id != null){
      this.roter.navigate(['index/all-cake'],{queryParams :{idKH : this.id,idLoai: idLoai}});
    }
    setTimeout(() => {
      location.reload();
    }, 200);
  }

  goToNCC(idNCC: any){
    if(this.id == null){
      this.roter.navigate(['index/all-cake'],{queryParams :{idNCC: idNCC}});
    }
    if(this.id != null){
      this.roter.navigate(['index/all-cake'],{queryParams :{idKH : this.id,idNCC: idNCC}});
    }
    setTimeout(() => {
      location.reload();
    }, 200);
  }

  goToDetailSaleOff(id: any){
    if(this.id == null){
      this.roter.navigate(['index/chi-tiet-khuyen-mai'],{queryParams :{idKM : id}});
    }
    else{
      this.roter.navigate(['index/chi-tiet-khuyen-mai'],{queryParams :{idKM : id,idKH: this.id}});
    }
    setTimeout(() => {
      location.reload();
    }, 200);
  }

  search(){
    if(this.id == null){
      this.roter.navigate(['index/all-cake'],{queryParams :{searchBanh: this.control.value}});
    }
    if(this.id != null){
      this.roter.navigate(['index/all-cake'],{queryParams :{idKH : this.id,searchBanh: this.control.value}});
    }
    setTimeout(() => {
      location.reload();
    }, 200);
  }
}

