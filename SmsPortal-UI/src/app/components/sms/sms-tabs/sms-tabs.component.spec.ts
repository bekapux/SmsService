import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTabsComponent } from './sms-tabs.component';

describe('SmsTabsComponent', () => {
  let component: SmsTabsComponent;
  let fixture: ComponentFixture<SmsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
