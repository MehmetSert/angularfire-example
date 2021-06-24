import { Pipe, PipeTransform } from '@angular/core';
import {AppService} from "../services/app.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Pipe({
  name: 'appName'
})
export class AppNamePipe implements PipeTransform {

  constructor(
    private appService: AppService
  ) {
  }

  transform(appId: string): Observable<string> {
    return this.appService.getApp(appId).pipe(
      map((res: any) => {
        return res.name;
      })
    );
  }

}
