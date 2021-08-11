import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GioHangService } from 'src/app/getApi/GioHang/gio-hang.service';
import { BanhGioHang, BanhMax } from 'src/app/modal/GioHang';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.scss'],
  providers: [GioHangService,BanhGioHang],
})
export class GioHangComponent implements OnInit {
  public idKH: any = 0;
  public thanhToan: Number = 0;
  public slBanhTrongGioHang: Number = 0;
  public Max: any = 0;
  banhGioHang: BanhGioHang[] = [];
  checkSL: boolean = true;
  checkThanhToan: boolean = false;
  constructor(
    public gioHang: GioHangService,
    public banhMax: BanhGioHang,
    public tangSL: BanhGioHang,
    public SPXoa: BanhGioHang,
    public acRouter: ActivatedRoute,
    public router: Router,
  ) {
    this.idKH = this.acRouter.snapshot.queryParamMap.get('idKH');
    this.getBanh();
   }

  ngOnInit(): void {
  }

  getBanh(){
    this.thanhToan = 0;
    this.gioHang.getBanhGioHang(this.idKH).subscribe(result => {
      this.banhGioHang = result;
      console.log(this.banhGioHang);
      
      if(this.banhGioHang.length > 0){
        this.checkSL = false;
        this.checkThanhToan = false;
        this.banhGioHang.forEach(ele => {
          ele.TongTien = 0;
          // this.gioHang.getSLBanhMax(ele.MaBanh,ele.MaKT).subscribe(resultMax => {
          //   this.banhMax = resultMax;
          //   ele.SLMax = this.banhMax.SLMax;
            
          // });
          if(ele.GiaTri != null && ele.LoaiKM == "%"){
            ele.TongTien = Number(ele.TongTien) + Number(ele.DonGiaBan)*Number(ele.SL)*(1-Number(ele.GiaTri)/100);
          }
          if(ele.GiaTri != null && ele.LoaiKM == "Tien"){
            ele.TongTien = Number(ele.TongTien) + Number(ele.DonGiaBan)*Number(ele.SL) - Number(ele.GiaTri);
          }
          if(ele.GiaTri == null){
            ele.TongTien = Number(ele.TongTien) + Number(ele.DonGiaBan)*Number(ele.SL);
          }
          this.thanhToan = Number(this.thanhToan) + Number(ele.TongTien);
        });
      } 
      else {
        this.checkSL = true;
        this.checkThanhToan = true;
      }  
      
      
    });
  }

  sub(MaBanh: any,MaKT: any,SL: any,SLMax: any,MaKH: any,MaKT_Banh: any,MaGH: any,Item: BanhGioHang){    
    this.Max = 0;
    this.gioHang.getSLBanhMax(MaBanh,MaKT).subscribe(resultMax => {
      this.banhMax = resultMax;      
      this.Max = this.banhMax.SLMax;
      if(SL < this.Max){ 
        SL = Number(SL) + 1;
        this.gioHang.putTangSL(SL,MaKH,MaKT_Banh,MaGH,this.tangSL).subscribe(result => {
          this.tangSL = result;
        });
      }
      if(SL >= this.Max){
        SL = Number(SL);
      }
      this.getBanh();
    });
    
  }

  minus(SL: any,SLMax: any,MaKH: any,MaKT_Banh: any,MaGH: any,Item: BanhGioHang){
    SL = Number(SL) - 1;
    if(SL  < 2){
      SL = 1;
    }
    this.gioHang.putTangSL(SL,MaKH,MaKT_Banh,MaGH,this.tangSL).subscribe(result => {
      this.tangSL = result;
      this.getBanh();
    });
  }

  xoaSP(MaKH: any,MaKT_Banh: any){
    const conf = window.confirm("Bạn muốn xóa không ?");
    if(conf){
      this.gioHang.deleteTungSP(MaKH,MaKT_Banh).subscribe(result => {
        this.SPXoa = result;
        this.getBanh();
        location.reload();
      });
      
    }
  }

  tienHanhThanhToan(){
    this.router.navigate(['index/thanh-toan'],{queryParams :{idKH : this.idKH}});
  }

}
