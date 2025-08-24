import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportNfeDataComponent } from './export-nfe-data.component';

describe('ExportNfeDataComponent', () => {
  let component: ExportNfeDataComponent;
  let fixture: ComponentFixture<ExportNfeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportNfeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportNfeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
