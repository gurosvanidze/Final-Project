import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercommentComponent } from './usercomment.component';

describe('UsercommentComponent', () => {
  let component: UsercommentComponent;
  let fixture: ComponentFixture<UsercommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsercommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
