import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNotificationComponent } from './detail-notification.component';

describe('DetailNotificationComponent', () => {
  let component: DetailNotificationComponent;
  let fixture: ComponentFixture<DetailNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
