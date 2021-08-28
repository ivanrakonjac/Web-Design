import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiserComponent } from './serviser.component';

describe('ServiserComponent', () => {
  let component: ServiserComponent;
  let fixture: ComponentFixture<ServiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
