import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeComponent } from './like.component';
import { By } from '@angular/platform-browser';

describe('LikeComponent', () => {
  let component: LikeComponent;
  let fixture: ComponentFixture<LikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle like and emit value on likeOrUnLike function', () => {
    component.favorited = false;
    const spy = jest.spyOn(component.onLike, 'emit');
    component.likeOrUnlike();
    expect(component.favorited).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should render like button on favorited is true', () => {
    component.favorited = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(
      By.css('.favorited'),
    )?.nativeElement;
    expect(button).toBeTruthy();
  });

  it('should render unlike button on favorited is false', () => {
    component.favorited = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(
      By.css('.favorited'),
    )?.nativeElement;
    expect(button).toBeUndefined();
  });
});
