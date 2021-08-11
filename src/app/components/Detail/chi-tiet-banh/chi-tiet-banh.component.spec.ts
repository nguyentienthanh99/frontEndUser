import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietBanhComponent } from './chi-tiet-banh.component';

describe('ChiTietBanhComponent', () => {
  let component: ChiTietBanhComponent;
  let fixture: ComponentFixture<ChiTietBanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiTietBanhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietBanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
