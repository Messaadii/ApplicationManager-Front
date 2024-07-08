import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppUpdaterConfigComponent } from './list-app-updater-config.component';

describe('ListAppUpdaterConfigComponent', () => {
  let component: ListAppUpdaterConfigComponent;
  let fixture: ComponentFixture<ListAppUpdaterConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAppUpdaterConfigComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListAppUpdaterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
