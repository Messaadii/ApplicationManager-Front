import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateDatabaseComponent } from './create-update-database.component';

describe('CreateUpdateDatabaseComponent', () => {
  let component: CreateUpdateDatabaseComponent;
  let fixture: ComponentFixture<CreateUpdateDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
