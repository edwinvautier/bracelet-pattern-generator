import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternColorComponent } from './pattern-color.component';

describe('PatternColorComponent', () => {
  let component: PatternColorComponent;
  let fixture: ComponentFixture<PatternColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatternColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
