import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResultHistoryComponent } from './update-result-history.component';

describe('UpdateResultHistoryComponent', () => {
  let component: UpdateResultHistoryComponent;
  let fixture: ComponentFixture<UpdateResultHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateResultHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateResultHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
