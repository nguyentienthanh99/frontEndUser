import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChiTietBanhComponent } from './components/Detail/chi-tiet-banh/chi-tiet-banh.component';
import { DetailSaleOffComponent } from './components/Detail/detail-sale-off/detail-sale-off.component';
import { DetailUserComponent } from './components/Detail/detail-user/detail-user.component';
import { GioHangComponent } from './components/gio-hang/gio-hang.component';
import { IndexComponent } from './components/index/index.component';
import { DangKyComponent } from './components/login/dang-ky/dang-ky.component';
import { LoginComponent } from './components/login/login.component';
import { TatCaSanPhamComponent } from './components/tat-ca-san-pham/tat-ca-san-pham.component';
import { ThanhToanComponent } from './components/thanh-toan/thanh-toan.component';

const routes: Routes = [
  { 
    path: 'index',
    component: IndexComponent,
    children: [
      {
        path: 'all-cake',
        component: TatCaSanPhamComponent,
      },
      { 
        path: 'login',
        component: LoginComponent,
      },
      { 
        path: 'singup',
        component: DangKyComponent,
      },
      {
        path: 'gio-hang',
        component: GioHangComponent,
      },
      { 
        path: 'gio-hang',
        component: GioHangComponent,
        children: [
          {
            path: 'thanh-toan',
            component: ThanhToanComponent,
          }
        ]
      },
      {
        path: 'thanh-toan',
        component: ThanhToanComponent,
      },
      {
        path: 'all-cake',
        component: TatCaSanPhamComponent,
        children: [
          { 
            path: 'chi-tiet-banh',
            component: ChiTietBanhComponent,
          },
        ]
      },
      { 
        path: 'chi-tiet-banh',
        component: ChiTietBanhComponent,
      },
      { 
        path: 'chi-tiet-khuyen-mai',
        component: DetailSaleOffComponent,
      },
      { 
        path: 'chi-nguoi-dung',
        component: DetailUserComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
