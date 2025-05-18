import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicineComponent } from './addmedicine.component';

describe('AddmedicineComponent', () => {
  let component: AddmedicineComponent;
  let fixture: ComponentFixture<AddmedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmedicineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
