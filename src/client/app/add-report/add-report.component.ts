import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Report } from '../shared/report.model';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {

  loading: Boolean = false;
  newReport: Report;

  user: User;
  users: User[] = [];
  _id: string;
  admin: string;


  constructor(public api: ApiService, private auth: AuthService) { }

  ngOnInit() {    
    this._id = localStorage.getItem('_id');

  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const formValues = Object.assign({}, form.value);

    const report: Report = {

      title: formValues.title,
      description: formValues.description,
      photoUrl: formValues.photo
    };

    this.api.post('reports', report)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newReport = data;
      });
  }

}