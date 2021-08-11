import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/getApi/User/user.service';
import { user } from 'src/app/modal/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // public mokedusers: user[] = []
  isAuthenticated = false;
  constructor(
    public mokeduser: user,
    public khachHang: UserService,
    public router: Router,
    ) { 
    // this.khachHang.checkLogin(this.mokeduser.TenKH,this.mokeduser.MatKhau).subscribe(result => {
    //   this.mokeduser = result;
    // });
  }

  authenticate(TenKH : any, MatKhau: any): boolean{
    if (this.checkCredentials(TenKH,MatKhau)) {
      this.isAuthenticated = true;
      this.router.navigate(['trang-chu']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredentials(TenKH : any, MatKhau: any): boolean {
    return this.checkLogin(TenKH.getLogin()) && this.checkPassword(MatKhau.getPassword());
  }

  private checkLogin(login: any): boolean {
    return login == this.mokeduser.TenKH;
  }

  private checkPassword(password: any): boolean {
    return password == this.mokeduser.MatKhau;
  }
}
