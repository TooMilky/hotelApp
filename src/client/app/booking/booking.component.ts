import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ScheduleserviceService } from '../shared/scheduleservice.service';
import { schedule } from '../shared/schedule.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

declare var $:any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
    scheduleForm:FormGroup;
    schedules:schedule[]=[];
    selectedSchedule:schedule;
    
colorList = {
  '':      'transparent',
  'red':    '#F36148',
  'yellow': '#FFF6AA',
}
days=[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]
times=[];
selectedTd=[];
  constructor(private fb: FormBuilder,private scheduleservice: ScheduleserviceService, private router: Router, private aR: ActivatedRoute, public api: ApiService, private auth : AuthService) { 
    this.getSchedules();
 }

  ngOnInit() {
        this.buildSchedule();
        
    }
    ngAfterViewInit() {
       this.applyValues();
    }
    refreshData(){
        this.applyValues();
    }
    buildSchedule(){
        for(var i=0;i<24;i++){
            this.times[i]=i;
        }
        this.addTdEvent(this);
    }
    addTdEvent(t){
        $("#tblTimetable").on("click", "td", function() {
            t.addTd(this);
        });
    }
    getSchedules(){
        this.scheduleservice.getSchedules()
            .subscribe(res => this.schedules = res);
        //alert(this.schedules.length);
    }
    applyValues(){
        for(var i=0;i<this.schedules.length;i++){
            var id = this.schedules[i].tdId;
            //alert(id);
            $("#"+id).removeClass();
            $("#"+id).addClass(this.schedules[i].className);
            $("#"+id).css("background-color",this.schedules[i].className);
        }
    }
    cycleColor(e, colorList):string {
        var className = "";
         var keys = Object.keys(colorList);
         var i = 1;
         className = keys[i];
         if($(e).attr('class')){
             i = keys.indexOf($(e).attr('class')) + 1;
             if ( i == keys.length ) i = 0;
            $(e).removeClass();
            className = keys[i];
         }
         
         $(e).removeClass();
         $(e).addClass(keys[i]);
         $(e).css("background-color",className);
        return className;
    }
    addTd(e){
        var className = this.cycleColor($(e), this.colorList);
        //db
        var id = $(e).attr("id");
        this.selectedSchedule = new schedule();
        this.selectedSchedule.tdId = id;
        this.selectedSchedule.className = className;
        var color = this.colorList[className].replace("#",'').trim();
        this.selectedSchedule.fontColor = color;
        //alert("saving tdId:" + id + " className:"+className);
        this.scheduleservice.updateSchedule(this.selectedSchedule,id).subscribe(newSchedule => {
        this.getSchedules();
            });
    }

    clearAll(){
    this.scheduleservice.clearAll().subscribe(newSchedule => {
        this.getSchedules();
            });
            this.refreshData();
    }

}
