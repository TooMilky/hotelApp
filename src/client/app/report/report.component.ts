import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Report } from '../shared/report.model';
import { ReportService } from '../shared/report.service';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() report: Report;
  byUser: string;
  _id: string;
  

  @HostBinding('class') columnClass = 'four wide column';

  constructor(private reportService : ReportService, private auth : AuthService, private api: ApiService) { }

  ngOnInit() {
    this.byUser = this.auth.getUsername();
  }

  deleteReport(id) {
    this.reportService.deleteReport(id).then((result) => {
    }, (err) => {
      console.log(err);
    });
  }


}
