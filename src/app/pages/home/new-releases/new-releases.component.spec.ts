import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleasesComponent } from './new-releases.component';

describe('NewReleasesComponent', () => {
  let component: NewReleasesComponent;
  let fixture: ComponentFixture<NewReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewReleasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
