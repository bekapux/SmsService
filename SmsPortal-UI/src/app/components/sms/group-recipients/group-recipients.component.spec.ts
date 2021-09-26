import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRecipientsComponent } from './group-recipients.component';

describe('GroupRecipientsComponent', () => {
  let component: GroupRecipientsComponent;
  let fixture: ComponentFixture<GroupRecipientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupRecipientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
