import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeofcommandComponent } from './listeofcommand.component';

describe('ListeofcommandComponent', () => {
  let component: ListeofcommandComponent;
  let fixture: ComponentFixture<ListeofcommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeofcommandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeofcommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
