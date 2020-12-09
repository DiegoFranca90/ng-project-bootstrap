import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "./components/components.module";
import { PipesModule } from "./pipes/pipes.module";
import { LayoutsModule } from './layouts/layouts.module';
import { DirectivesModule } from "./directives/directives.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from "@core/http/api.interceptor";


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
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
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
