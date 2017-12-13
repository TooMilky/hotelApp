import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Report } from '../shared/report.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { ReportService } from '../shared/report.service';


@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {

  loading: Boolean = false;
  editReport: Report;
  report: Report[];  
  _id: string;
  private sub: any;

  constructor(private reportService : ReportService, public api: ApiService, private router: Router, private route: ActivatedRoute) { }

 
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id'];
    });
    
    this.api.get('reports/' + this._id)
    .subscribe(data => this.report = data);    
  }

  updateReport(id) {
    
    this.reportService.updateReport(id, this.report).then((result) => { 
    }, (err) => {
      console.log(err);
    });

    this.api.get('reports/' + this._id)
    .subscribe(data => this.editReport = data);  

  }

}
