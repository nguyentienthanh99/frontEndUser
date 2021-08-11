import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KhuyenMaiService } from 'src/app/getApi/KhuyenMai/khuyen-mai.service';
import { Product } from 'src/app/modal/product';
import { saleOff } from 'src/app/modal/sale-offs';

@Component({
  selector: 'app-detail-sale-off',
  templateUrl: './detail-sale-off.component.html',
  styleUrls: ['./detail-sale-off.component.scss'],
  providers: [saleOff,KhuyenMaiService],
})
export class DetailSaleOffComponent implements OnInit {
  id: any;
  idKH: any;
  listBanhKM: Product[] = [];
  constructor(
    public routerAC: ActivatedRoute,
    public router: Router,
    public khuyenMai: KhuyenMaiService,
    public itemKM: saleOff,
  ) {
    this.id = this.routerAC.snapshot.queryParamMap.get("idKM");
    this.idKH = this.routerAC.snapshot.queryParamMap.get("idKH");
    this.getKM();
    this.getListBanhKM();
   }

  ngOnInit(): void {
  }

  getKM(){
    this.khuyenMai.getDetailKM(this.id).subscribe(result => {
      this.itemKM = result;      
    });
  }

  getListBanhKM(){
    this.khuyenMai.getBanhKM(this.id).subscribe(result => {
      this.listBanhKM = result;  
      console.log(this.listBanhKM);
          
    });
  }

  goToDetail(id: any){
    if(this.idKH == null){
      this.router.navigate(['index/chi-tiet-banh'],{queryParams :{id : id}});
    }
    else{
      this.router.navigate(['index/chi-tiet-banh'],{queryParams :{id : id,idKH: this.idKH}});
    }
      setTimeout(() => {
        location.reload()
      }, 1000);
  }

}
