import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BanhService } from 'src/app/getApi/Banh/banh.service';
import { GioHangService } from 'src/app/getApi/GioHang/gio-hang.service';
import { BanhGioHang } from 'src/app/modal/GioHang';
import { KichThuocBanh } from 'src/app/modal/KichThuoc';
import { Product } from 'src/app/modal/product';

@Component({
  selector: 'app-chi-tiet-banh',
  templateUrl: './chi-tiet-banh.component.html',
  styleUrls: ['./chi-tiet-banh.component.scss'],
  providers: [BanhService,Product,GioHangService,BanhGioHang],
})
export class ChiTietBanhComponent implements OnInit {
  id: any;
  idKH: any;
  SL: Number = 1;
  Tong: Number = 0;
  listTenKTBanh: KichThuocBanh[] = [];
  checkClickGia: boolean = true;
  listBanhCungLoai: Product[] = [];
  giaTienKT: Number = 0;
  MaKT_Banh: any;
  checkGiaSP: boolean = false;
  constructor(
    public router: Router,
    public acRouter: ActivatedRoute,
    public itemBanh: Product,
    public Banhs: BanhService,
    public GioHang: GioHangService,
    public banhGioHang: BanhGioHang,
  ) {
    this.id = this.acRouter.snapshot.queryParamMap.get('id');
    this.idKH = this.acRouter.snapshot.queryParamMap.get('idKH');
    this.getChiTietBanh();
    this.getTenKTBanh();
   }

  ngOnInit(): void {
  }

  checkGia(MaKT: any){
    // this.giaTienKT = 0;
    this.Tong = 0;
    this.SL = 1;
    this.checkClickGia = false;
    this.listTenKTBanh.forEach(ele => {
      if(ele.MaKT == MaKT){
        this.Tong = Number(ele.SLTon);
        this.giaTienKT = Number(ele.DonGiaBan);
        console.log(ele.DonGiaBan);
      }
    });
  }

  remove(){
    this.SL = Number(this.SL)-1;
    if(this.SL<=1){
      this.SL = 1;
    }
  }

  sub(){
    this.SL = Number(this.SL)+1;
    if(this.SL>=this.Tong){
      this.SL = this.Tong;
    }
    
  }
  
  showMaKTBanh(MaKT: any){
    this.GioHang.getMaKTBanh(this.id,MaKT).subscribe(result => {
      this.MaKT_Banh = result.MaKT_Banh;
    });
  }

  ThemVaoGioHang(){
    if(this.idKH != null){
      const conf = window.confirm("Bạn có muốn thêm vào giỏa hàng k ?");
      if(conf){
        this.GioHang.themSPVaoGioHang(this.idKH,this.MaKT_Banh,this.SL,this.banhGioHang).subscribe(result => {
          this.banhGioHang = result;
        });
        location.reload();
      }
    }
    else{
      this.router.navigate(['/index/login']);
    }
    
  }

  getChiTietBanh(){
    this.Banhs.getChiTietBanh(this.id).subscribe(result => {
      this.itemBanh = result;
      this.Banhs.getKichThuocBanh(this.id).subscribe(resultKT =>{
        this.itemBanh.ListKT = resultKT;
        this.getBanhCUngLoai();
        this.itemBanh.GiaMin = this.itemBanh.ListKT[0].DonGiaBan;
        if(this.itemBanh.ListKT.length>1){
          this.itemBanh.GiaMax = this.itemBanh.ListKT[this.itemBanh.ListKT.length-1].DonGiaBan;
          this.itemBanh.checkgia= true;
        }       
        // if(this.itemBanh.ListKT.length = 1) this.itemBanh.checkgia= true;
      })
    });
  }

  getTenKTBanh(){
    this.Banhs.getTenKichThuocBanh(this.id).subscribe(result => {
      this.listTenKTBanh = result;
      console.log(this.listTenKTBanh);
    });
  }

  getBanhCUngLoai(){
    this.listBanhCungLoai = [];
    this.Banhs.getBanhCungLoai(this.itemBanh.MaLoaiBanh).subscribe(resultBCL => {
      resultBCL.forEach(ele => {
        if(ele.MaBanh != this.id){
          this.listBanhCungLoai.push(ele);
        }
      });
      // console.log(this.listBanhCungLoai);
    });
  }

  goToDetail(id: any){
    this.router.navigate(['index/chi-tiet-banh'],{queryParams :{id : id,idKH: this.idKH}});
      setTimeout(() => {
        location.reload()
      }, 1000);
  }
}
