import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HoursWorkedService } from 'src/app/services/hours-worked.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  private workedDays: any;
  private dayHours = 0;
  private nightHours = 0;
  private sundayHours = 0;

  resultSaveHoursWorked: any;
  hoursWorkedForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly hoursWorkedService: HoursWorkedService) {

    this.hoursWorkedForm = this.fb.group({
      id: [''],
      idReport: ['', Validators.required],
      idTechnical: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    
  }

  ngOnInit(): void {
    this.resultSaveHoursWorked =[];
    this.workedDays = [];

    this.hoursWorkedForm.controls.startDate.valueChanges.subscribe((value) => {
      if (this.hoursWorkedForm.controls.endDate.value) {
        if (value && value >= this.hoursWorkedForm.controls.endDate.value) {
          this.hoursWorkedForm.controls.endDate.setErrors({ oldDate: true });
        } else {
          this.hoursWorkedForm.controls.endDate.setErrors(null);
        }
      }
    });

    this.hoursWorkedForm.controls.endDate.valueChanges.subscribe((value) => {
      if (this.hoursWorkedForm.controls.startDate.value) {
        if (value && value <= this.hoursWorkedForm.controls.startDate.value) {
          this.hoursWorkedForm.controls.endDate.setErrors({ oldDate: true });
        } else {
          this.hoursWorkedForm.controls.endDate.setErrors(null);
        }
      }
    });
  }

  saveService(): void {
    this.calculateServiceHours(new Date(this.hoursWorkedForm.value.startDate),
    new Date(this.hoursWorkedForm.value.endDate));

    this.hoursWorkedService.saveServiceHours({id: "", idReport: this.hoursWorkedForm.value.idReport,
      idTechnical: this.hoursWorkedForm.value.idTechnical, startDate: this.workedDays[0].startDate,
      endDate: this.workedDays[0].endDate,  dayHours: this.workedDays[0].dayHours,
      weekNumber: this.workedDays[0].weekNumber, nightHours: this.workedDays[0].nightHours,
      sundayHours: this.workedDays[0].sundayHours  }).subscribe(resp => {

      const initDate = new Date(resp.startDate);
      const endDat = new Date(resp.endDate);
      this.resultSaveHoursWorked =[];
      let initMonth = initDate.getMonth()+1;
      let endMonth = endDat.getMonth()+1;
      this.resultSaveHoursWorked.push({
        idReport: resp.idReport,
        idTechnical: resp.idTechnical,
        startDate: initDate.getDate()+"/"+initMonth+"/"+initDate.getFullYear()+" "+initDate.getHours()+
                    ":"+initDate.getMinutes(),
        endDate: endDat.getDate()+"/"+endMonth+"/"+endDat.getFullYear()+" "+endDat.getHours()+
                    ":"+endDat.getMinutes()
      });

      this.hoursWorkedForm.reset();
      this.workedDays = [];
    },  error => { console.error(error) }
    )
  }

  private calculateServiceHours(startDate: Date, endDate: Date): void {
    if (startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()) {
          this.calculateServiceHoursPerDay(startDate, endDate);
    } else {
      this.calculateServiceHoursPerDay(startDate, this.getLastDayHour(startDate));
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0, 0, 0);
      while (startDate.getDate() !== endDate.getDate()) {
        this.calculateServiceHoursPerDay(startDate, this.getLastDayHour(startDate));
        startDate.setDate(startDate.getDate() + 1);
        startDate.setHours(0, 0, 0);
      }
      this.calculateServiceHoursPerDay(startDate, endDate);
    }
  }

  private calculateServiceHoursPerDay(startDate: Date, endDate: Date): void {
    let tempDate: Date;
    tempDate = new Date(startDate);
    if (startDate.getHours() === endDate.getHours()) {
      this.setWorkedMinutes(startDate, false, endDate);
    } else {
      if (startDate.getMinutes() !== 0) {
        this.setWorkedMinutes(startDate, true); 
      }
      this.setWorkedTimeBetweenTwoHours(startDate.getHours(), endDate.getHours(), startDate.getDay());
      if (endDate.getMinutes() !== 0) {
        this.setWorkedMinutes(endDate, false);
      }
    }
    this.addWorkedDay(tempDate ? tempDate : startDate, endDate);
  }

  private getLastDayHour(date: Date): Date {
    const lastDayHour = new Date(date.getTime());
    lastDayHour.setHours(23, 59, 59);
    return lastDayHour;
  }

  private setWorkedMinutes(date: Date, isInitialMinutes: boolean, hourFractionDate?: Date): void {
    
    let minutes: number;
    if (hourFractionDate) {
      minutes = (hourFractionDate.getMinutes() - date.getMinutes()) / 60;
    } else {
      minutes = isInitialMinutes ? (60 - date.getMinutes()) / 60 : date.getMinutes() / 60;
    }
    switch (this.getHourType(date.getHours(), date.getDay())) {
      case 'S':
        this.sundayHours = this.sundayHours + minutes;
        break;
      case 'D':
        this.dayHours = this.dayHours + minutes;
        break;
      case 'N':
        this.nightHours = this.nightHours + minutes;
        break;
    }
    if (isInitialMinutes) {
      date.setHours(date.getHours() + 1);
    }
  }

  private setWorkedTimeBetweenTwoHours(startHour: number, endHour: number, currentDay: number): void {
    for (let i = startHour; i < endHour; i++) {
      switch (this.getHourType(i, currentDay)) {
        case 'S':
          this.sundayHours++;
          break;
        case 'D':
          this.dayHours++;
          break;
        case 'N':
          this.nightHours++;
          break;
      }
    }
  }

  private addWorkedDay(startDate: Date, endDate: Date): void {
    this.workedDays.push({
      weekNumber: this.getDateWeek(startDate),
      dayHours: Number(this.dayHours.toFixed(1)),
      nightHours: Number(this.nightHours.toFixed(1)),
      sundayHours: Number(this.sundayHours.toFixed(1)),
      startDate,
      endDate
    });
    this.dayHours = 0;
    this.nightHours = 0;
    this.sundayHours = 0;
  }

  private getHourType(hour: number, currentDay: number): string {
    if (currentDay === 0) {
      return 'S';
    } else {
      if (hour >= 7 && hour <= 19) {
        return 'D';
      } else {
        return 'N';
      }
    }
  }

  private getDateWeek(date: Date): number {
    const tempDate = new Date(date);
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - (tempDate.getDay() + 6) % 7);
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  
}
