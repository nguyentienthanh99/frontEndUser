import { KichThuocBanh } from "./KichThuoc";

export class Product{
    MaBanh: Number = 0;
    TenBanh: string = '';
    TenNCC: string = '';
    SL: Number = 0;
    TenLoaiBanh: string = '';
    AnhSP: string = '';
    HinhDang: string = '';
    MoTa: string = '';
    MaLoaiBanh: Number = 0;
    SLBan: Number = 0;
    GiaMin: Number = 0;
    GiaMax: Number = 0;
    TrangThaiLoaiBanh: boolean = true;
    ListKT: KichThuocBanh[] = [];
    checkgia: boolean = true;
    SLTon: Number = 0;
}