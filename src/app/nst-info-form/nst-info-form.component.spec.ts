import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NstInfoFormComponent } from './nst-info-form.component';

describe('NstInfoFormComponent', () => {
  let component: NstInfoFormComponent;
  let fixture: ComponentFixture<NstInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NstInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NstInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
