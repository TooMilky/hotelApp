import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {

  constructor(public api: ApiService) { }

  updateReport(id, data) {
    return new Promise((resolve, reject) => {
        this.api.put('/reports/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteReport(id) {
    return new Promise((resolve, reject) => {
        this.api.delete('/reports/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
}
