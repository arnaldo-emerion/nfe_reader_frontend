import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPerNfeComponent } from './prod-per-nfe.component';

describe('ProdPerNfeComponent', () => {
  let component: ProdPerNfeComponent;
  let fixture: ComponentFixture<ProdPerNfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdPerNfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdPerNfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
