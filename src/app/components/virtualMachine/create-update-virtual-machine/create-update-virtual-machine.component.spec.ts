import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateVirtualMachineComponent } from './create-update-virtual-machine.component';

describe('CreateUpdateVirtualMachineComponent', () => {
  let component: CreateUpdateVirtualMachineComponent;
  let fixture: ComponentFixture<CreateUpdateVirtualMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateVirtualMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateVirtualMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
