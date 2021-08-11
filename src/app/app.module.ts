import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { GioHangComponent } from './components/gio-hang/gio-hang.component';
import { TatCaSanPhamComponent } from './components/tat-ca-san-pham/tat-ca-san-pham.component';


import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DonVi, LoaiKM, SubDate, UpLow, UpText } from './pipe/DonVi.pipe';
import { ChiTietBanhComponent } from './components/Detail/chi-tiet-banh/chi-tiet-banh.component';
import { ThanhToanComponent } from './components/thanh-toan/thanh-toan.component';
import { IndexComponent } from './components/index/index.component';
import { IndexRoutingModule } from './components/index/index-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { DetailUserComponent } from './components/Detail/detail-user/detail-user.component';
import { DangKyComponent } from './components/login/dang-ky/dang-ky.component';
import { DetailSaleOffComponent } from './components/Detail/detail-sale-off/detail-sale-off.component';
import { NgxPaginationModule } from 'ngx-pagination';
const MatMD = [
  MatListModule,
  MatBadgeModule,
  A11yModule,
  ClipboardModule,
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
  DragDropModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  ScrollingModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
]
  const Pipe = [
    DonVi,
    UpLow,
    UpText,
    SubDate,
    LoaiKM,
  ]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    GioHangComponent,
    TatCaSanPhamComponent,
    Pipe,
    ChiTietBanhComponent,
    ThanhToanComponent,
    IndexComponent,
    FooterComponent,
    DetailUserComponent,
    DangKyComponent,
    DetailSaleOffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexRoutingModule,
    BrowserAnimationsModule,
    MatMD,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
