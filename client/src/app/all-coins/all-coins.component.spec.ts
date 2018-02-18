import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoinsComponent } from './all-coins.component';

describe('AllCoinsComponent', () => {
  let component: AllCoinsComponent;
  let fixture: ComponentFixture<AllCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
