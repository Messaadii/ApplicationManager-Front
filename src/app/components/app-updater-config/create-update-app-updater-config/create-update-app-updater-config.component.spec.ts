import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAppUpdaterConfigComponent } from './create-update-app-updater-config.component';

describe('CreateUpdateAppUpdaterConfigComponent', () => {
  let component: CreateUpdateAppUpdaterConfigComponent;
  let fixture: ComponentFixture<CreateUpdateAppUpdaterConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateAppUpdaterConfigComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateAppUpdaterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
