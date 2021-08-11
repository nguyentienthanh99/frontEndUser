import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChiTietBanhComponent } from '../Detail/chi-tiet-banh/chi-tiet-banh.component';
import { GioHangComponent } from '../gio-hang/gio-hang.component';
import { TatCaSanPhamComponent } from '../tat-ca-san-pham/tat-ca-san-pham.component';
import { ThanhToanComponent } from '../thanh-toan/thanh-toan.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { 
      path: '',
      component: IndexComponent,
      children: [
        {
          path: '',
          component: TatCaSanPhamComponent,
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
