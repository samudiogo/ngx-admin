import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { IccmSelectWidgetComponent } from './custom-widget-components/iccm-select-widget/iccm-select-widget.component';
import { JsonSchemaFormService } from 'angular6-json-schema-form';
import {
  NbSelectModule,
  NbCardModule,
} from '@nebular/theme';

@NgModule({
  declarations: [PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    SearchHeaderComponent,
    IccmSelectWidgetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NbSelectModule,
    NbCardModule,

    // ngx-datatable
    NgxDatatableModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // shared components
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    SearchHeaderComponent,

    IccmSelectWidgetComponent,

  ],
  providers: [JsonSchemaFormService],
  entryComponents: [IccmSelectWidgetComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [JsonSchemaFormService]
    }
  }
}
