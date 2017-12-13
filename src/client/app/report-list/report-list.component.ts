import { Component, OnInit } from '@angular/core';
import { Report } from '../shared/report.model';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reports: Report[];

  constructor(public api: ApiService, private auth : AuthService) { }

  ngOnInit() {
    this.api.get('reports')
      .subscribe(data => this.reports = data);
  }

}
