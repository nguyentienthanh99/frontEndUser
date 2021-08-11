export class user {
    MaKH : Number = 0;
    TenKH: string = '';
    NgaySinh: Date = new Date();
    GioiTinh: string = '';
    SDT : string = '';
    Email : string = '';
    Anh: string = '';
    DiaChi: string = '';
    Phuong: string = '';
    Quan : string = '';
    ThanhPho : string = '';
    MatKhau : string = '';
    TrangThai : boolean = false;
    // constructor(TenKH: string, MatKhau: string){
    //     this.TenKH = TenKH;
    //     this.MatKhau = MatKhau;
    // }

    // getTenKH(): string {
    //     return this.TenKH;
    // }

    // getMatKhau(): string {
    //     return this.MatKhau;
    // }
}

export class admin {
    MaAD : Number = 0;
    MaTK: Number = 0;
    Anh: string = '';
    TenAD: string = '';
    MatKhau : string = '';
}