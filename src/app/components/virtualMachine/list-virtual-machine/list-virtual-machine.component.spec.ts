import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVirtualMachineComponent } from './list-virtual-machine.component';

describe('ListVirtualMachineComponent', () => {
  let component: ListVirtualMachineComponent;
  let fixture: ComponentFixture<ListVirtualMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListVirtualMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVirtualMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
