import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTemplateDetailsComponent } from './sms-template-details.component';

describe('SmsTemplateDetailsComponent', () => {
  let component: SmsTemplateDetailsComponent;
  let fixture: ComponentFixture<SmsTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsTemplateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
