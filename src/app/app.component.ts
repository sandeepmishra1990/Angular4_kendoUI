
import { Component } from '@angular/core';
import { sampleProducts} from './products';
import { sampleProducts2} from './products2';
import { CategoriesService } from './northwind.service';
import { State } from '@progress/kendo-data-query';

import {
    GridDataResult,
    DataStateChangeEvent,
    SelectableSettings,
    SelectableMode,
    PageChangeEvent,
    RowArgs
} from '@progress/kendo-angular-grid';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
 // public checkboxOnly = false;
   // public mode : SelectableMode= 'multiple';
   // public selectableSettings: SelectableSettings;
    public mySelection: any[] =  [2, 4];
    public pageSize = 5;
    public skip = 0;


       // public gridData: any[] = products;
  public view4: Observable<GridDataResult>;
  public view3: any[];
  public view: Observable<GridDataResult>;
  //this is required to emit state durimg page chnage like if we click 2 state will pass skip 5 and take 5 in datechange mathod
  public state: State = {
        skip: 0,
        take: 5
    };

  

   constructor(private service: CategoriesService) {
      
      //selectable settings setup
     // this.setSelectableSettings();
        //via http.get from northwind service example from kendo UI
        this.view = service;
        this.service.query(this.state);
      
      
      //via get without observable
      //  this.service.products2().subscribe(res => {
       //   this.view4 = res['books'];
       //   console.log(this.view4[0]);
      //  });
      
      
      
      //via httpclient.GET observable...............
      this.view4 =this.service.products4();
      
   //direct assigned array
     this.view3 = sampleProducts2;
      
    }


  
  //select check box implementation
  
 // public setSelectableSettings(): void {
   //     this.selectableSettings = 
     //   {
       //     checkboxOnly: this.checkboxOnly,
         //   mode: this.mode
        //};
   // }
 

   

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.service.query(state);
    }

    public pageChange(event: PageChangeEvent): void {
      this.skip = event.skip;//during page chnage it skip no of elements wrt to page number and take value
      this.view4 = this.service.products4();

      // Optionally, clear the selection when paging
      // this.mySelection = [];
  }

}

