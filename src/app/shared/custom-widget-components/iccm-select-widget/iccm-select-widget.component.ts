import { Component,
         OnInit,
         ComponentRef,
         Input,
         ViewChild,
         ViewContainerRef,
         ComponentFactoryResolver } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

import { isArray, JsonSchemaFormService, buildTitleMap } from 'angular6-json-schema-form';
@Component({
  selector: 'ngx-iccm-select-widget',
  templateUrl: './iccm-select-widget.component.html',
  styleUrls: ['./iccm-select-widget.component.scss'],
})
export class IccmSelectWidgetComponent implements OnInit {

  formControl: AbstractControl;
  controlName: string;
  controlDisabled = false;
  selectList: any[] = [];
  isArray = isArray;
  boundControl = false;

  newComponent: ComponentRef<any> = null;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  httpSource: string;
  options: any;
  isAuthenticated: false;
  columnName: string;
  columnValue: any;

  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer: ViewContainerRef;

  constructor(
    private httpClient: HttpClient,
    private jsf: JsonSchemaFormService,
    private componentFactory: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};

    if (typeof (this.options.source) !== 'undefined') {
      this.httpSource = this.options.source;
    }

    if (typeof (this.options.columnName) !== 'undefined') {
      this.columnName = this.layoutNode.options.columnName;
    }

    if (typeof (this.options.columnValue) !== 'undefined') {
      this.columnValue = this.options.columnValue;
    }
    this.httpClient.get(this.httpSource)
        .toPromise()
        .then( (res: any) => {
            const responseList = res.data.map(item => {
              return {
                value: item[this.columnValue],
                name: item[this.columnName],
              };
            });

            this.selectList = buildTitleMap(responseList,
              this.options.enum,
              !!this.options.required,
              !!this.options.flatList);
          },
        );
  }

  private loadList() {
    const promise = new Promise((resolve, reject) => {

    });
    return promise;
  }

  updateComponent() {
    if (!this.newComponent && (this.layoutNode || {}).widget) {
      this.newComponent = this.widgetContainer.createComponent(
        this.componentFactory.resolveComponentFactory(this.layoutNode.widget)
      );
    }
    if (this.newComponent) {
      for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
        this.newComponent.instance[input] = this[input];
      }
    }
  }

  updateValue(event) {
    console.log(this)
    this.jsf.updateValue(this, event.target.value);
  }
}
