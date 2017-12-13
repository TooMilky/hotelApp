import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { schedule } from '../shared/schedule.model'

@Injectable()
export class ScheduleserviceService {
result:any;

  constructor(private http: Http) { }
  
  getSchedules(){
    return this.http.get("/api/schedules/all")
        .map(result => this.result = result.json());
  }

  updateSchedule(post: schedule,tdId){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});
    
    return this.http.post('/api/schedules/update/'+tdId,JSON.stringify(post),options)
        .map(result => this.result = result.json());
  }

  clearAll(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});
    
    return this.http.post('/api/schedules/clear',options)
        .map(result => this.result = result.json());
  }

}
