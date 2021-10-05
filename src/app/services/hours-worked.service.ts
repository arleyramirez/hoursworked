import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResultWorkReport } from '../shared/model/resultHoursWorkedModel';
import { SaveWorkReport } from '../shared/model/saveHoursWorkedModel';

@Injectable({
  providedIn: 'root'
})
export class HoursWorkedService {

  private API_SERVER = "http://localhost:8080/service";

  constructor(private httpClient: HttpClient) { }

  public saveServiceHours (serviceHours:SaveWorkReport): Observable<SaveWorkReport> {
    return this.httpClient.post<SaveWorkReport>(this.API_SERVER, serviceHours);
  }

  public getServiceHours (idTechnical: string, weekNumber: string): Observable<ResultWorkReport> {
    return this.httpClient.get<ResultWorkReport>(this.API_SERVER + '/' + idTechnical + '/' + weekNumber);
  }
  
}
