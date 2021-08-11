
  export class Bill{
    MaHD: string = '';
    MaKH: string = '';
    TenKH: string = '';
    TrangThaiGiaoHang: boolean = false;
    TrangThaiThanhToan: boolean = false;
    TrangThaiXacThuc: boolean = false;
    PhuongThucThanhToan: string = '';
    NgayTaoHD: Date = new Date();
    SoTienConLai: Number = 0;
    completed: boolean = false;
    GhiChu: string = '';
    TrangThai: boolean = false;
    MaHDMax: Number = 0;
    CtHD: CTHDUser[] = [];
    ThanhTien: Number = 0;
  }

  export class SoHoaDon{
    SoHoaDon: Number = 0;
  }

  export class CTHDUser{
    SL: Number = 0;
    DonGiaBan: Number = 0;
    LoaiKM: string = '';
    GiaTri: Number = 0;
    TenBanh: string = '';
    TenKT: string = '';
  }