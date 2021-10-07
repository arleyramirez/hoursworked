import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HoursWorkedService } from 'src/app/services/hours-worked.service';
import { HoursWorkedServiceMock } from 'src/app/shared/mocks/hours-worked.service.mock';
import { serviceHours } from 'src/app/shared/mocks/serviceHours.mock';

import { ConsultingHoursComponent } from './consulting-hours.component';

fdescribe('ConsultingHoursComponent', () => {
  let component: ConsultingHoursComponent;
  let fixture: ComponentFixture<ConsultingHoursComponent>;
  const hoursWorkedServiceMock = new HoursWorkedServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ConsultingHoursComponent
      ],
      providers: [{provide: HoursWorkedService, useValue: hoursWorkedServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Method "getHours"', () => {
    it('when this return existing value', fakeAsync( () => {
      
      const spyResetForm = spyOn(component.consultingHoursForm, 'reset');
      const validForm = {...serviceHours};
      component.consultingHoursForm.setValue(validForm);
      const parameterExpect = validForm;

      component.getHours();

      expect(hoursWorkedServiceMock.getServiceHours).toHaveBeenCalledWith(parameterExpect.idTechnicalConsulting, parameterExpect.numberWeek);
      expect(spyResetForm).toHaveBeenCalled();
    }));
  });
  
});
