import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HoursWorkedService } from 'src/app/services/hours-worked.service';
import { HoursWorkedServiceMock } from 'src/app/shared/mocks/hours-worked.service.mock';

import { CreateServiceComponent } from './create-service.component';

fdescribe('CreateServiceComponent', () => {
  let component: CreateServiceComponent;
  let fixture: ComponentFixture<CreateServiceComponent>;
  const hoursWorkedServiceMock = new HoursWorkedServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule     
      ],
      declarations: [
        CreateServiceComponent
      ],
      providers: [{provide: HoursWorkedService, useValue: hoursWorkedServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Form validations]', () => {
    describe('Control "idReport"', () => {
      it('when this control is empty value "required"', () => {

        const idReport = component.hoursWorkedForm.get('idReport');
        const emptyValue = '';

        idReport?.setValue(emptyValue);
  
        expect(idReport?.errors?.required).toBeTruthy();
        expect(idReport?.valid).toBeFalse();
      });
    });

    describe('Control "idTechnical"', () => {
      it('when this control is correct value "required"', () => {

        const idTechnical = component.hoursWorkedForm.get('idTechnical');
        const emptyValue = '1045';

        idTechnical?.setValue(emptyValue);
  
        expect(idTechnical?.errors).toBeNull();
        expect(idTechnical?.valid).toBeTrue();
      });
    });

    describe('Control "startDate"', () => {
      it('when this control is correct value "required"', () => {

        const startDate = component.hoursWorkedForm.get('startDate');
        const emptyValue = '12/05/2021';

        startDate?.setValue(emptyValue);
  
        expect(startDate?.errors).toBeNull();
        expect(startDate?.valid).toBeTrue();
      });
    });

    describe('Control "endDate"', () => {
      it('when this control is empty value "required"', () => {

        const endDate = component.hoursWorkedForm.get('endDate');
        const emptyValue = '';

        endDate?.setValue(emptyValue);
  
        expect(endDate?.errors?.required).toBeTruthy();
        expect(endDate?.valid).toBeFalse();
      });
    });

  });
});
