import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/getApi/User/user.service';
import { Customer } from 'src/app/modal/customer';
import { user } from 'src/app/modal/login';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [user,UserService,AuthenticationService,Customer],
})
export class LoginComponent implements OnInit {
  nhapLaiMatKhau: any;
  itemCheckPass: boolean = true;
  itemCheckPass1: boolean = true;
  typeInput = "password";
  typeInput1 = "password";
  Empty = new FormControl('', [Validators.required]);
  EmptyMatKhau = new FormControl('', [Validators.required]);
  EmptyNhapLaiMatKhau = new FormControl('', [Validators.required]);
  EmptySDT = new FormControl('', [Validators.required]);
  EmptyPhuong = new FormControl('', [Validators.required]);
  EmptyQuan = new FormControl('', [Validators.required]);
  EmptyTP = new FormControl('', [Validators.required]);
  EmptyDiaChi = new FormControl('', [Validators.required]);
  mesErr: any;
  checkten: boolean = false;
  checkpass: boolean = false;
  checkLogin: boolean = true;
  checkDangKy: boolean = true;
  checkpassnhap: boolean = false;
  isFormValid = false;
  areCredentialsInvalid = false;
  EmptyEmail = new FormControl('', [Validators.required,Validators.email]);
  constructor(
    private http: HttpClient,
    public users: user,
    public usersDK: Customer,
    public logins: UserService,
    private roter: Router,
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  getLogin(TenKH: any,MatKhau: any){
    this.logins.checkLogin(TenKH,MatKhau).subscribe(result => {
      if(result != null){
        this.users = result;
        this.roter.navigate(['index/all-cake'],{queryParams :{idKH : this.users.MaKH}});
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
      if(result == null){
        window.alert("Bạn vui lòng nhập lại thông tin !!!");
      }
    });
    
  }

  checkPas(){
    this.itemCheckPass = !this.itemCheckPass;
    this.checkTypeInput();
  }

  // checkPas1(){
  //   this.itemCheckPass1 = !this.itemCheckPass1;
  //   this.checkTypeInput1();
  // }

  checkTypeInput(){
    if(this.itemCheckPass == false){
      this.typeInput = 'text';
    }
    else this.typeInput = 'password';
  }

  // checkTypeInput1(){
  //   if(this.itemCheckPass1 == false){
  //     this.typeInput1 = 'text';
  //   }
  //   else this.typeInput1 = 'password';
  // }

  DangKy(){
    this.roter.navigate(['index/singup']);
  }

  // xacNhan(TenKH: any,NgaySinh: any,GioiTinh: any,SDT: any,Email: any,DiaChi: any,Phuong: any,Quan: any,ThanhPho: any,MatKhau: any){
  //   if(this.EmptyEmail.hasError('email')){
  //     this.mesErr = 'Nhập sai kiểu. Ex: abc@gmail.com';
  //   }
  //   if(this.EmptyEmail.valid){
  //     this.mesErr = "Chưa nhập email"
  //   }
  //   else {
  //     this.logins.postDangKy(TenKH,NgaySinh,GioiTinh,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,MatKhau,this.usersDK).subscribe(result => {
  //       this.usersDK = result;
  //     });
  //     this.getLogin(TenKH,MatKhau);
  //     window.alert("Bạn đã đăng ký thành công. Hãy đăng nhập");
  //     // this.checkDangKy = true;
  //   }
  // }

  // getNgaySinh(ev : any){
  //   this.usersDK.NgaySinh = ev;
  // }

  // changeClientGT(ev : any){
  //   this.usersDK.GioiTinh = ev;
  // }

  // close(){
  //   const conf = window.confirm("Bạn có muốn hủy không ?");
  //   if(conf){
  //     this.checkDangKy = true;
  //   }
  // }

  goto(){

  }
}
