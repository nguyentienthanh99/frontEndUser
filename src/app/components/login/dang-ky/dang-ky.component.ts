import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/getApi/User/user.service';
import { Customer } from 'src/app/modal/customer';

@Component({
  selector: 'app-dang-ky',
  templateUrl: './dang-ky.component.html',
  styleUrls: ['./dang-ky.component.scss'],
  providers: [Customer,UserService],
})
export class DangKyComponent implements OnInit {
  mesErr: any;
  itemCheckPass: boolean = true;
  itemCheckPass1: boolean = true;
  typeInput = "password";
  typeInput1 = "password";
  Empty = new FormControl('', [Validators.required,Validators.minLength(6)]);
  EmptyMatKhau = new FormControl('', [Validators.required,Validators.minLength(6)]);
  EmptyNhapLaiMatKhau = new FormControl('', [Validators.required]);
  EmptySDT = new FormControl('', [Validators.required]);
  EmptyPhuong = new FormControl('', [Validators.required]);
  EmptyQuan = new FormControl('', [Validators.required]);
  EmptyTP = new FormControl('', [Validators.required]);
  EmptyDiaChi = new FormControl('', [Validators.required]);
  EmptyEmail = new FormControl('', [Validators.required,Validators.email]);
  constructor(
    public usersDK: Customer,
    private roter: Router,
    public logins: UserService,
  ) { }

  ngOnInit(): void {
  }

  getNgaySinh(ev : any){
    this.usersDK.NgaySinh = ev;
  }

  changeClientGT(ev : any){
    this.usersDK.GioiTinh = ev;
  }

  close(){
    const conf = window.confirm("Bạn có muốn hủy không ?");
    if(conf){
      this.roter.navigate(['index/login']);
    }
  }

  checkPas(){
    this.itemCheckPass = !this.itemCheckPass;
    this.checkTypeInput();
  }

  checkPas1(){
    this.itemCheckPass1 = !this.itemCheckPass1;
    this.checkTypeInput1();
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

  xacNhan(TenKH: any,NgaySinh: any,GioiTinh: any,SDT: any,Email: any,DiaChi: any,Phuong: any,Quan: any,ThanhPho: any,MatKhau: any){
    if(TenKH == '' || GioiTinh == '' || SDT == '' || Email == '' || DiaChi == '' || Phuong == '' || Quan == '' || ThanhPho == '' || MatKhau == '' || this.EmptyEmail.hasError('email') || this.EmptyEmail.hasError('required') || this.Empty.hasError('required') || this.EmptyMatKhau.hasError('required') || this.EmptyMatKhau.hasError('minlength') || this.EmptySDT.hasError('required') || this.EmptyDiaChi.hasError('required') || this.EmptyPhuong.hasError('required') || this.EmptyQuan.hasError('required') || this.EmptyTP.hasError('required')){
      window.alert("Bạn vui lòng nhập đủ thông tin");
    }
    else {
      this.logins.postDangKy(TenKH,NgaySinh,GioiTinh,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,MatKhau,this.usersDK).subscribe(result => {
        this.usersDK = result;
      });
      window.alert("Bạn đã đăng ký thành công. Hãy đăng nhập");
      this.roter.navigate(['index/login']);
      // this.checkDangKy = true;
    }
  }
}
