import { of } from "rxjs";

export class HoursWorkedServiceMock {
    saveServiceHours = jasmine.createSpy('saveServiceHours').and.returnValue(of('Ok'));
    getServiceHours = jasmine.createSpy('getServiceHours').and.returnValue(of('Ok'));
}

