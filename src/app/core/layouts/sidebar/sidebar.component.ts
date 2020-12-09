import {Component, Inject, InjectionToken, OnInit, Optional} from '@angular/core';

export const SIDEBAR_MENU = new InjectionToken<Array<any>>("SidebarMenu");

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(@Optional() @Inject(SIDEBAR_MENU) public menu) {
  }

  ngOnInit() {
    console.log(this.menu);
  }

}
