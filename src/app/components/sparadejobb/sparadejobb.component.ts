import { Component, OnInit } from '@angular/core';
import { SparadejobbService } from 'app/services/sparadejobb/sparadejobb.service';
import { CommonModule } from "@angular/common"


@Component({
  selector: 'pb-sparadejobb',
  templateUrl: './sparadejobb.component.html',
  styleUrls: ['./sparadejobb.component.scss']
})
export class SparadejobbComponent implements OnInit {

  constructor(private sparadejobbService: SparadejobbService ) { }

  loading = true;
  forgetAllPending = false;

  sparadejobb: Array<object>;

  ngOnInit() {
    this.sparadejobbService.getSparadeJobb(1, 25).subscribe((result:Array<object>) => {
      this.sparadejobb = result;
      console.log(result);
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  openForgetAllModal() {
    console.log('open forgetallmoal');
  } 

  hasSavedJobs() {
    return true;
  }

}
