import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HoaDonService } from 'src/app/getApi/HoaDon/hoa-don.service';
import { UserService } from 'src/app/getApi/User/user.service';
import { Bill } from 'src/app/modal/bills';
import { Customer } from 'src/app/modal/customer';


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
  providers: [Customer,UserService,HoaDonService]
})
export class DetailUserComponent implements OnInit {
  idKH: any;
  checkChinhSua: boolean = false;
  checkDoiPass: boolean = false;
  itemCheckPass: boolean = true;
  itemCheckPass1: boolean = true;
  itemCheckPass2: boolean = true;
  disabledPass: boolean = true;
  disabledPass1: boolean = true;
  disabledPass2: boolean = true;
  checkSelecNS: boolean = false;
  images: any;
  CheckAnh: any;
  typeInput: any = 'password';
  typeInput1: any = 'password';
  typeInput2: any = 'password';
  NgaySinh: Date = new Date();
  passCu: any;
  passMoi: any;
  checkLaiPass: any;
  mesErr: any;
  ngaySinh: any;
  ngaySinh1: any;
  EmptyEmail = new FormControl('', [Validators.required,Validators.email]);
  billLichSu: Bill[] = [];
  billXacThuc: Bill[] = [];
  billGiaoHang: Bill[] = [];
  displayedColumns: string[] = ['MaHD', 'NgayTao', "ThanhTien", "ListCT"];
  constructor(
    public router: Router,
    public routerAC: ActivatedRoute,
    public khachHang: Customer,
    public user: UserService,
    public billService: HoaDonService,
    public http: HttpClient,
  ) {
    this.idKH = this.routerAC.snapshot.queryParamMap.get("idKH");
    this.getUser();    
    this.getLichSuMuaHang();
    this.getDangGiaoHang();
    this.getChoXacThuc();
  }

  ngOnInit(): void {
  }

  getUser(){
    this.user.getUser(this.idKH).subscribe(result => {
      this.khachHang = result;
      this.NgaySinh = this.khachHang.NgaySinh;
      
      // this.khachHang.NgaySinh = new Date(this.khachHang.NgaySinh).toString();      
    });
  }

  chinhSua(){
    this.checkChinhSua = true;
  }

  xacNhanChinhSua(NS: any){
    this.getUser();
    
    if(this.EmptyEmail.hasError('email')){
      this.mesErr = 'Nhập sai kiểu. Ex: abc@gmail.com';
    }
    else{
      const conf = window.confirm("Bạn muốn chỉnh sửa không ?");
      if(conf){
        this.checkChinhSua = false;
        const formData = new FormData();
        formData.append('fileAnhUser', this.images);
        this.http.post<any>('http://localhost:3000/fileAnhUser', formData).subscribe(
          (res) => console.log(res),
        );
        if(this.CheckAnh == undefined){
          this.CheckAnh = this.khachHang.Anh;
        }
        if(this.ngaySinh != undefined){
          this.user.suaKhachHang(this.idKH,this.ngaySinh,this.khachHang.GioiTinh,this.khachHang.SDT,this.khachHang.Email,this.CheckAnh,this.khachHang.DiaChi,this.khachHang.Phuong,this.khachHang.Quan,this.khachHang.ThanhPho,this.khachHang).subscribe(result => {
            this.khachHang = result;
          });
        }
        if(this.ngaySinh == undefined || this.ngaySinh == new Date()){
          this.user.suaKhachHang(this.idKH,this.NgaySinh,this.khachHang.GioiTinh,this.khachHang.SDT,this.khachHang.Email,this.CheckAnh,this.khachHang.DiaChi,this.khachHang.Phuong,this.khachHang.Quan,this.khachHang.ThanhPho,this.khachHang).subscribe(result => {
            this.khachHang = result;
          });
        }
        console.log(this.khachHang.NgaySinh );
        
        window.alert("Chỉnh sửa thành công !");
        this.getUser();
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }
    
  }

  demo(ev: any){
    this.checkSelecNS == true;
    
  }

  checkDoiMK(){
    console.log(123);
    
    if(this.passCu != this.khachHang.MatKhau){
      window.alert("Bạn nhập sai mật khẩu");
    }
    else if(this.passMoi != this.checkLaiPass){
      window.alert("Nhập lại mật khẩu không giống với mật khẩu mới!");
    }
    else{
      const conf = window.confirm("Bạn muốn đổi mật khẩu không ?");
      if(conf){
        this.user.suaMatKhau(this.idKH, this.passMoi, this.khachHang).subscribe(result => {
          this.khachHang = result;
          window.alert("Đã đổi mật khẩu thàng công. Bạn vui lòng đăng nhập lại!");
          setTimeout(() => {
            location.reload();
          }, 100);
        });
      }
    }
  }

  showPass(){
    this.itemCheckPass = !this.itemCheckPass;
    this.checkTypeInput();
  }
  showPass1(){
    this.itemCheckPass1 = !this.itemCheckPass1;
    this.checkTypeInput1();
  }
  showPass2(){
    this.itemCheckPass2 = !this.itemCheckPass2;
    this.checkTypeInput2();
  }

  checkTypeInput(){
    if(this.itemCheckPass == false){
      this.typeInput = 'text';
    }
    else this.typeInput = 'password';
  }
  checkTypeInput1(){
    if(this.itemCheckPass1 == false){
      this.typeInput1 = 'text';
    }
    else this.typeInput1 = 'password';
  }
  checkTypeInput2(){
    if(this.itemCheckPass2 == false){
      this.typeInput2 = 'text';
    }
    else this.typeInput2 = 'password';
  }

  doiPass(){
    this.checkDoiPass = true;
  }

  close(){
    const conf = window.confirm("Bạn muốn hủy không ?");
    if(conf){
      this.checkChinhSua = false;
      this.checkDoiPass = false;
    }
  }
  getdate(ev : any){
    console.log(ev.value);
    const date = ev.value.getFullYear() + "-" + (Number(ev.value.getMonth())+1).toString() + "-" + ev.value.getDate();
    this.ngaySinh = date;
    console.log(this.ngaySinh);
    
  }
  getNgaySinh(ev: any){ 
    this.checkSelecNS = true;
    console.log(ev);
    const date = ev.getFullYear() + "-" + (Number(ev.getMonth())+1).toString() + "-" + ev.getDate();
    this.ngaySinh = date;   
    
  }

  addImg(ev: any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/AnhUser/" + this.images.name;
    }    
  }

  changeClientGT(ev: any){
    console.log(ev);
  }

  checkNhap(ev : any){
    if(ev != null && ev != ''){
      this.disabledPass =false;
    }
    else this.disabledPass =true;
  }
  checkNhap1(ev : any){
    if(ev != null && ev != ''){
      this.disabledPass1 =false;
    }
    else this.disabledPass1 =true;
  }
  checkNhap2(ev : any){
    if(ev != null && ev != ''){
      this.disabledPass2 =false;
    }
    else this.disabledPass2 =true;
  }

  getLichSuMuaHang(){
    this.billService.getListLichSuMuaHang(this.idKH).subscribe(result => {
      this.billLichSu = result;
      this.billLichSu.forEach(ele => {
        ele.ThanhTien = 0;
        this.billService.getListCTHD(ele.MaHD).subscribe(resultCTHD => {
          ele.CtHD = resultCTHD;
          ele.CtHD.forEach(eleCTHD => {
            if((eleCTHD.LoaiKM != null || eleCTHD.GiaTri != null) && eleCTHD.LoaiKM == "%"){
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL) - Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL)*Number(eleCTHD.GiaTri)/100;
            }
            if((eleCTHD.LoaiKM != null || eleCTHD.GiaTri != null) && eleCTHD.LoaiKM == "Tien"){
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL) - Number(eleCTHD.GiaTri);
            }
            else{
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL);
            }
          });
        });
      });
    });
  }

  getDangGiaoHang(){
    this.billService.getListDangGiaoHang(this.idKH).subscribe(result => {
      this.billGiaoHang = result;
      this.billGiaoHang.forEach(ele => {
        ele.ThanhTien = 0;
        this.billService.getListCTHD(ele.MaHD).subscribe(resultCTHD => {
          ele.CtHD = resultCTHD;
          ele.CtHD.forEach(eleCTHD => {
            if((eleCTHD.LoaiKM != null || eleCTHD.GiaTri != null) && eleCTHD.LoaiKM == "%"){
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL) - Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL)*Number(eleCTHD.GiaTri)/100;
            }
            if((eleCTHD.LoaiKM != null || eleCTHD.GiaTri != null) && eleCTHD.LoaiKM == "Tien"){
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL) - Number(eleCTHD.GiaTri);
            }
            else{
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL);
            }
          });
        });
      });
    });
  }

  getChoXacThuc(){
    this.billService.getListLichDangChoXacNhan(this.idKH).subscribe(result => {
      this.billXacThuc = result;
      this.billXacThuc.forEach(ele => {
        ele.ThanhTien = 0;
        this.billService.getListCTHD(ele.MaHD).subscribe(resultCTHD => {
          ele.CtHD = resultCTHD;
          ele.CtHD.forEach(eleCTHD => {
            if((eleCTHD.LoaiKM != null || eleCTHD.GiaTri != null) && eleCTHD.LoaiKM == "%"){
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL) - Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL)*Number(eleCTHD.GiaTri)/100;
            }
            if((eleCTHD.LoaiKM != null || eleCTHD.GiaTri != null) && eleCTHD.LoaiKM == "Tien"){
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL) - Number(eleCTHD.GiaTri);
            }
            else{
              ele.ThanhTien = Number(ele.ThanhTien) + Number(eleCTHD.DonGiaBan)*Number(eleCTHD.SL);
            }
          });
        });
      });
    });
  }
}