import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HoursWorkedService } from 'src/app/services/hours-worked.service';

@Component({
  selector: 'app-consulting-hours',
  templateUrl: './consulting-hours.component.html',
  styleUrls: ['./consulting-hours.component.css']
})
export class ConsultingHoursComponent implements OnInit {
  
  resultHoursWorked: any;
  consultingHoursForm: FormGroup;
  
  constructor(private readonly fb: FormBuilder, private readonly hoursWorkedService: HoursWorkedService) { 
    
    this.consultingHoursForm = this.fb.group({
      idTechnicalConsulting: ['', Validators.required],
      numberWeek: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.resultHoursWorked = [];
  }

  getHours(): void {
    this.hoursWorkedService.getServiceHours(this.consultingHoursForm.value.idTechnicalConsulting, 
    this.consultingHoursForm.value.numberWeek).subscribe(resp => {
      this.resultHoursWorked = resp;
      this.consultingHoursForm.reset();
    },  error => { console.error(error) }
  )}

}
