import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserInfoService {

  private subject = new Subject;

  send(value: string) {
    this.subject.next(value);
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }
}
