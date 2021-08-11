import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GioHangService } from 'src/app/getApi/GioHang/gio-hang.service';
import { UserService } from 'src/app/getApi/User/user.service';
import { Bill } from 'src/app/modal/bills';
import { CTHD } from 'src/app/modal/CTHD';
import { Customer } from 'src/app/modal/customer';
import { BanhGioHang } from 'src/app/modal/GioHang';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.scss'],
  providers: [UserService,Customer,BanhGioHang,Bill,CTHD],
})
export class ThanhToanComponent implements OnInit {
  public id: any;
  listGioHang: BanhGioHang[] = [];
  ListHSDMin: BanhGioHang[] = [];
  ListMaCTPNMin: BanhGioHang[] = [];
  thanhToan: any;
  selected: any;
  MaHDMaxAdd: Number = 0;
  GhiChu: any;
  disable_select: boolean = true;
  check_type_1: boolean = true;
  check_type_2: boolean = true;
  check_dh: boolean = true;
  kieuThanhToan1: boolean = true;
  kieuThanhToan2: boolean = true;
  now: Date = new Date();
  hsdMin: any;
  maCTPNMin: any;
  constructor(
    public khachHang: UserService,
    public user: Customer,
    public userPut: Customer,
    public gioHang: GioHangService,
    public banhMax: BanhGioHang,
    public HSDMin: BanhGioHang,
    public MaCTPNMin: BanhGioHang,
    public putSLTon: BanhGioHang,
    public xoaAll: BanhGioHang,
    public bill: Bill,
    public MaHDMax: Bill,
    public CTHD: CTHD,
    public acRouter: ActivatedRoute,
    public router: Router,
  ) {
    this.id = this.acRouter.snapshot.queryParamMap.get('idKH');
    this.getUser();
    this.getGioHang();
   }

  ngOnInit(): void {
  }

  getUser(){
    this.khachHang.getUser(this.id).subscribe(result => {
      this.user = result;
    });
  }

  getGioHang(){
    this.thanhToan = 0;
    this.gioHang.getBanhGioHang(this.id).subscribe(result => {
      this.listGioHang = result;
      this.listGioHang.forEach(ele => {
        ele.TongTien = 0;
        this.gioHang.getSLBanhMax(ele.MaBanh,ele.MaKT).subscribe(resultMax => {
          this.banhMax = resultMax;
          ele.SLMax = this.banhMax.SLMax;
        });
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
    });
  }

  select(ev: any){
    this.disable_select = false;

    if(ev == "Chuyển khoản ngân hàng"){
      this.check_type_1 = false;
      this.check_type_2 = true;
    }
    if(ev == "Thanh toán khi nhận hàng"){
      this.check_type_1 = true;
      this.check_type_2 = false;
    }
  }

  datHang(TenKH:any,SDT: any,Email:any,DiaChi: any,Phuong: any,Quan: any,ThanhPho:any){
    const conf = window.confirm("Bạn có chắc muốn đặt hàng không ?");
    if(conf){
      this.check_dh = false;
      if(this.selected == "Chuyển khoản ngân hàng"){
        this.kieuThanhToan1 = false;
        this.kieuThanhToan2 = true;
      }
      if(this.selected == "Thanh toán khi nhận hàng"){
        this.kieuThanhToan1 = true;
        this.kieuThanhToan2 = false;
      }
      this.khachHang.putUser(this.id,TenKH,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,this.user).subscribe(result => {
        this.user = result;
      });
      this.khachHang.getMaHDMax().subscribe(resultMaHDMax => {
        this.MaHDMax = resultMaHDMax;
        this.MaHDMaxAdd = Number(this.MaHDMax.MaHDMax) + 1;
        console.log(this.MaHDMaxAdd);
        
        this.khachHang.postBill(this.MaHDMaxAdd,this.id,this.selected,this.GhiChu,this.bill).subscribe(resultNewBill => {
          this.bill = resultNewBill;
          this.listGioHang.forEach(ele => {
            this.khachHang.postDetailBill(this.MaHDMaxAdd,ele.MaKT_Banh,ele.SL,this.CTHD).subscribe(resultCTHD => {
              this.CTHD = resultCTHD;
              console.log(this.CTHD);
            });
            this.khachHang.getHSDMin(ele.MaBanh,ele.MaKT).subscribe(resultHSDMin =>{
              this.HSDMin = resultHSDMin;
              // console.log(this.HSDMin);
              
              this.khachHang.getMaCTPNMin(ele.MaBanh,ele.MaKT,this.HSDMin.HSD).subscribe(resultMaCTHDMin =>{
                  this.MaCTPNMin = resultMaCTHDMin;
                  // console.log(this.MaCTPNMin);
                  
                  this.khachHang.putSLTon((Number(ele.SLMax)- Number(ele.SL)),ele.MaKT_Banh,this.MaCTPNMin.HSD,this.MaCTPNMin.MaCTPN,this.putSLTon).subscribe(resultPutSLTon => {
                      this.putSLTon = resultPutSLTon;
                      this.gioHang.deleteGioHang(this.id).subscribe(result => {
                        this.xoaAll = result;
                      });
                    });
                });
            }); 
          });
        });
      });
      this.getGioHang();
      this.getUser();
    }
  }

  goToTrangChu(){
    this.router.navigate(['index/all-cake'],{queryParams :{idKH: this.id}});
    setTimeout(() => {
      location.reload();
    }, 300);
  }
}
