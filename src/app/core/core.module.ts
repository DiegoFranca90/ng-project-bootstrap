import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from "./components";
import {PipesModule} from "./pipes";
import {LayoutsModule} from './layouts';
import {DirectivesModule} from "./directives";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiInterceptor} from "./http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    LayoutsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    LayoutsModule
  ]
})
export class CoreModule {
}
