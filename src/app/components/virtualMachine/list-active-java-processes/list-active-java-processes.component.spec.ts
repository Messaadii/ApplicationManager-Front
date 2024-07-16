import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveJavaProcessesComponent } from './list-active-java-processes.component';

describe('ListActiveJavaProcessesComponent', () => {
  let component: ListActiveJavaProcessesComponent;
  let fixture: ComponentFixture<ListActiveJavaProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListActiveJavaProcessesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActiveJavaProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
