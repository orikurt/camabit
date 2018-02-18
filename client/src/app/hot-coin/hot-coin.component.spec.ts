import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotCoinComponent } from './hot-coin.component';

describe('HotCoinComponent', () => {
  let component: HotCoinComponent;
  let fixture: ComponentFixture<HotCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
