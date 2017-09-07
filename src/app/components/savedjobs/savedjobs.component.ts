import { Component } from '@angular/core';
import { JoblistComponent } from './joblist.component';
import { NavComponent } from '../static/nav.component';

@Component({
    moduleId: module.id,
    selector: 'app-saved-jobs',
    templateUrl: 'savedjobs.component.html',
    styleUrls: ['savedjobs.component.scss'],
    providers: []
})

export class SavedJobsComponent  {
    constructor() {

    }
}
