import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLaboratorioComponent } from './crear-laboratorio.component';

describe('CrearLaboratorioComponent', () => {
  let component: CrearLaboratorioComponent;
  let fixture: ComponentFixture<CrearLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLaboratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
