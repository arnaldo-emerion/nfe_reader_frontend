import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranspListComponent } from './transp-list.component';

describe('TranspListComponent', () => {
  let component: TranspListComponent;
  let fixture: ComponentFixture<TranspListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranspListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranspListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
