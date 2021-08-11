import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BanhService } from 'src/app/getApi/Banh/banh.service';
import { GioHangService } from 'src/app/getApi/GioHang/gio-hang.service';
import { BanhGioHang } from 'src/app/modal/GioHang';
import { saleOff } from 'src/app/modal/sale-offs';
import { TypeProduct } from 'src/app/modal/type-product';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[BanhService,GioHangService],
})
export class HeaderComponent implements OnInit {
  @Input() idFrom : any; 
  // id: any;
  LoaiBanhs: TypeProduct[] = [];
  KhyenMais: saleOff[] = [];
  listGioHang: BanhGioHang[] = [];
  DemSLBanh: any = 0;
  constructor(
    public Banhs: BanhService,
    public gioHang: GioHangService,
    public roter: Router,
  ) { 
    this.getAllLoaiBanh();
    this.getAllKhuyenmai();
    this.getBanhGH();
  }

  ngOnInit(): void {
  }

  getBanhGH(){
    this.gioHang.getBanhGioHang(this.idFrom).subscribe(result => {
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

  goToGioHang(){
    this.roter.navigate(['index/gio-hang'],{queryParams :{id : this.idFrom}});
  }

}
