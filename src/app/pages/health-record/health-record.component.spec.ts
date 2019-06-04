import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRecordComponent } from './health-record.component';

describe('HealthRecordComponent', () => {
  let component: HealthRecordComponent;
  let fixture: ComponentFixture<HealthRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
