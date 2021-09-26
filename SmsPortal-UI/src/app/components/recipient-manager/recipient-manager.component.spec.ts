import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientManagerComponent } from './recipient-manager.component';

describe('RecipientManagerComponent', () => {
  let component: RecipientManagerComponent;
  let fixture: ComponentFixture<RecipientManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
