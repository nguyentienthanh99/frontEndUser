import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BanhService } from 'src/app/getApi/Banh/banh.service';
import { KichThuocBanh } from 'src/app/modal/KichThuoc';
import { NhaCungCap } from 'src/app/modal/nhacungcap';
import { Product } from 'src/app/modal/product';

@Component({
  selector: 'app-tat-ca-san-pham',
  templateUrl: './tat-ca-san-pham.component.html',
  styleUrls: ['./tat-ca-san-pham.component.scss'],
  providers: [BanhService],
})
export class TatCaSanPhamComponent implements OnInit {
  dem: any = 0;
  idKH: any;
  idLoai: any;
  idSSearchBanh: any;
  idNCC: any;
  listBanh: Product[] = [];
  listKichThuocBanh: KichThuocBanh[] = [];
  checkGia: boolean = false;
  checkLoaiBanh: boolean = false;
  checkNCC: boolean = false;
  checkBanhSearch: boolean = false;
  disPage: boolean = true;
  page = 1;
  constructor(
    public Banhs: BanhService,
    public router: Router,
    public acRouter: ActivatedRoute,
  ) { 
    this.idKH = this.acRouter.snapshot.queryParamMap.get('idKH');
    this.idLoai = this.acRouter.snapshot.queryParamMap.get('idLoai');
    this.idSSearchBanh = this.acRouter.snapshot.queryParamMap.get('searchBanh');
    this.idNCC = this.acRouter.snapshot.queryParamMap.get('idNCC');       
    console.log(this.idNCC);
    
    if(this.idLoai == null && this.idNCC == null){
      this.getAllBanh();
    }
    if(this.idLoai != null){
      this.getListLoaiBanh();
    }
    if(this.idSSearchBanh != null){
      this.getBanhSearch();
    }
    if(this.idNCC != null){
      this.getListBanhNCC();
    }
  }

  ngOnInit(): void {
  }

  getAllBanh(){
    this.Banhs.getBanh().subscribe(result => {
      this.listBanh = result;      
      this.listBanh.forEach(element => {
        this.Banhs.getKichThuocBanh(element.MaBanh).subscribe(result => {
          element.ListKT = result;
          element.GiaMin = element.ListKT[0].DonGiaBan;
          if(element.ListKT.length>1){
            element.GiaMax = element.ListKT[element.ListKT.length-1].DonGiaBan;
            element.checkgia = true;
          }       
        });
      });
    });
  }

  getListLoaiBanh(){
    this.Banhs.getBanhCungLoai(this.idLoai).subscribe(result => {
      this.listBanh = result;
      if(this.listBanh.length<1){
        this.checkLoaiBanh = true;
        this.disPage = false;
      }
      else{
        this.checkLoaiBanh = false;
        this.listBanh.forEach(element => {
          this.Banhs.getKichThuocBanh(element.MaBanh).subscribe(result => {
            element.ListKT = result;
            element.GiaMin = element.ListKT[0].DonGiaBan;
            if(element.ListKT.length>1){
              element.GiaMax = element.ListKT[element.ListKT.length-1].DonGiaBan;
              element.checkgia = true;
            }       
          });
        });
      }
    });
  }

  getListBanhNCC(){
    this.Banhs.getBanhNCC(this.idNCC).subscribe(result => {
      this.listBanh = result;
      if(this.listBanh.length<1){
        this.checkNCC = true;
        this.disPage = false;
      }
      else{
        this.checkNCC = false;
        this.listBanh.forEach(element => {
          this.Banhs.getKichThuocBanh(element.MaBanh).subscribe(result => {
            element.ListKT = result;
            element.GiaMin = element.ListKT[0].DonGiaBan;
            if(element.ListKT.length>1){
              element.GiaMax = element.ListKT[element.ListKT.length-1].DonGiaBan;
              element.checkgia = true;
            }       
          });
        });
      }
    });
  }

  getBanhSearch(){
    this.Banhs.getBanhSearch(this.idSSearchBanh).subscribe(result => {
      this.listBanh = result;
      console.log(this.listBanh);
      
      if(this.listBanh.length<1){
        this.checkBanhSearch = true;
        this.disPage = false;
      }
      else{
        this.checkBanhSearch = false;
        this.listBanh.forEach(element => {
          this.Banhs.getKichThuocBanh(element.MaBanh).subscribe(result => {
            element.ListKT = result;
            element.GiaMin = element.ListKT[0].DonGiaBan;
            if(element.ListKT.length>1){
              element.GiaMax = element.ListKT[element.ListKT.length-1].DonGiaBan;
              element.checkgia = true;
            }       
          });
        });
      }
    });
  }

  goToDetail(id: any){
      this.router.navigate(['index/chi-tiet-banh'],{queryParams :{id : id,idKH: this.idKH}});    
  }

}
