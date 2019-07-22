import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IccmSelectWidgetComponent } from './iccm-select-widget.component';

describe('IccmSelectWidgetComponent', () => {
  let component: IccmSelectWidgetComponent;
  let fixture: ComponentFixture<IccmSelectWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IccmSelectWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IccmSelectWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
