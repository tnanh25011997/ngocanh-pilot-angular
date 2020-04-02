import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelBrandComponent } from './del-brand.component';

describe('DelBrandComponent', () => {
  let component: DelBrandComponent;
  let fixture: ComponentFixture<DelBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
