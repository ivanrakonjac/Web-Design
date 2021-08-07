import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoKnjigaComponent } from './info-knjiga.component';

describe('InfoKnjigaComponent', () => {
  let component: InfoKnjigaComponent;
  let fixture: ComponentFixture<InfoKnjigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoKnjigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoKnjigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
