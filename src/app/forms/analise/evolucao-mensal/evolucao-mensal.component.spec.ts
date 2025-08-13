import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucaoMensalComponent } from './evolucao-mensal.component';

describe('EvolucaoMensalComponent', () => {
  let component: EvolucaoMensalComponent;
  let fixture: ComponentFixture<EvolucaoMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolucaoMensalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolucaoMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
