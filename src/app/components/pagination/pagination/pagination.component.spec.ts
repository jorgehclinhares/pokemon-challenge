import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { PaginationConfiguration } from './pagination';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render numbers page elements', () => {
    const configuration: PaginationConfiguration = {
      totalItems: 100,
      actualPage: 1,
      limitPagesVisible: 5,
    };
    component.configuration = configuration;

    fixture.detectChanges();

    const buttonsNumbers = fixture.debugElement.queryAll(
      By.css('.page-numbers-for-testing a'),
    );

    buttonsNumbers.forEach((button, index) => {
      expect(button.nativeElement.innerHTML).toEqual(String(index + 1));
    });

    expect(buttonsNumbers.length).toEqual(5);
  });

  it('should emit next page on click next button', () => {
    const configuration: PaginationConfiguration = {
      totalItems: 100,
      actualPage: 1,
      limitPagesVisible: 5,
    };
    component.configuration = configuration;
    const spyGoToPageFunction = jest.spyOn(component.onPageChange, 'emit');

    const nextButton = fixture.debugElement.query(
      By.css('#nextButton'),
    )?.nativeElement;

    nextButton.click();

    expect(component.pageConfiguration.actualPage).toEqual(2);
    expect(component.pagesVisible).toEqual([1, 2, 3, 4, 5]);
    expect(spyGoToPageFunction).toHaveBeenCalledWith(2);
  });

  it('should emit change route on click number button', () => {
    const configuration: PaginationConfiguration = {
      totalItems: 100,
      actualPage: 1,
      limitPagesVisible: 5,
    };
    component.configuration = configuration;
    const spyGoToPageFunction = jest.spyOn(component.onPageChange, 'emit');

    fixture.detectChanges();

    const firstButtonNumber = fixture.debugElement.query(
      By.css('.page-numbers-for-testing'),
    ).nativeElement;

    firstButtonNumber.click();
    expect(component.pageConfiguration.actualPage).toBe(1);
    expect(component.pagesVisible).toEqual([1, 2, 3, 4, 5]);
    expect(spyGoToPageFunction).toHaveBeenCalledWith(1);
  });

  it('should stay on page 100 on next button click', () => {
    const configuration: PaginationConfiguration = {
      totalItems: 100,
      actualPage: 100,
      limitPagesVisible: 5,
    };
    component.configuration = configuration;
    const spyGoToPageFunction = jest.spyOn(component.onPageChange, 'emit');

    const nextButton = fixture.debugElement.query(
      By.css('#nextButton'),
    )?.nativeElement;

    nextButton.click();

    expect(component.pageConfiguration.actualPage).toEqual(100);
    expect(spyGoToPageFunction).not.toHaveBeenCalled();
  });

  it('should emit previous page on click precious button', () => {
    const configuration: PaginationConfiguration = {
      totalItems: 100,
      actualPage: 2,
      limitPagesVisible: 5,
    };
    component.configuration = configuration;
    const spyGoToPageFunction = jest.spyOn(component.onPageChange, 'emit');

    const previousButton = fixture.debugElement.query(
      By.css('#previousButton'),
    )?.nativeElement;

    previousButton.click();

    expect(component.pageConfiguration.actualPage).toEqual(1);
    expect(component.pagesVisible).toEqual([1, 2, 3, 4, 5]);
    expect(spyGoToPageFunction).toHaveBeenCalledWith(1);
  });

  it('should stay on page 1 on previous button click', () => {
    const configuration: PaginationConfiguration = {
      totalItems: 100,
      actualPage: 1,
      limitPagesVisible: 5,
    };
    component.configuration = configuration;
    const spyGoToPageFunction = jest.spyOn(component.onPageChange, 'emit');

    const previousButton = fixture.debugElement.query(
      By.css('#previousButton'),
    )?.nativeElement;

    previousButton.click();

    expect(component.pageConfiguration.actualPage).toEqual(1);
    expect(component.pagesVisible).toEqual([1, 2, 3, 4, 5]);
    expect(spyGoToPageFunction).not.toHaveBeenCalled();
  });
});
