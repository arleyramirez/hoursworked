import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HoursWorkedService } from './services/hours-worked.service';
import { HoursWorkedServiceMock } from './shared/mocks/hours-worked.service.mock';
import { serviceHours } from './shared/mocks/serviceHours.mock';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const hoursWorkedServiceMock = new HoursWorkedServiceMock();
  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: HoursWorkedService, useValue: hoursWorkedServiceMock}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hoursworked'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app.title).toEqual('hoursworked');
  });

 /*it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    debugger
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container')?.textContent).toContain('Registro');
  });*/

  describe('[Form validations]', () => {
    describe('Control "idReport"', () => {
      it('when this control is empty value "required"', () => {

        const idReport = app.hoursWorkedForm.get('idReport');
        const emptyValue = '';

        idReport?.setValue(emptyValue);
  
        expect(idReport?.errors?.required).toBeTruthy();
        expect(idReport?.valid).toBeFalse();
      });

    });

    describe('Control "idTechnical"', () => {
      it('when this control is correct value "required"', () => {

        const idTechnical = app.hoursWorkedForm.get('idTechnical');
        const emptyValue = '1045';

        idTechnical?.setValue(emptyValue);
  
        expect(idTechnical?.errors).toBeNull();
        expect(idTechnical?.valid).toBeTrue();
      });

    });

    describe('Control "startDate"', () => {
      it('when this control is correct value "required"', () => {

        const startDate = app.hoursWorkedForm.get('startDate');
        const emptyValue = '12/05/2021';

        startDate?.setValue(emptyValue);
  
        expect(startDate?.errors).toBeNull();
        expect(startDate?.valid).toBeTrue();
      });

    });

    describe('Control "endDate"', () => {
      it('when this control is empty value "required"', () => {

        const endDate = app.hoursWorkedForm.get('endDate');
        const emptyValue = '';

        endDate?.setValue(emptyValue);
  
        expect(endDate?.errors?.required).toBeTruthy();
        expect(endDate?.valid).toBeFalse();
      });

    });

    describe('Method "getHours"', () => {
      it('when this return existing value', fakeAsync( () => {
        
        const spyResetForm = spyOn(app.consultingHoursForm, 'reset');
        const validForm = {...serviceHours};
        app.consultingHoursForm.setValue(validForm);
        const parameterExpect = validForm;

        app.getHours();

        expect(hoursWorkedServiceMock.getServiceHours).toHaveBeenCalledWith(parameterExpect.idTechnicalConsulting, parameterExpect.numberWeek);
        expect(spyResetForm).toHaveBeenCalled();
      }));

    });

  });
});
