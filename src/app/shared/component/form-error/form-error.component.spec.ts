import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorComponent } from './form-error.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <form>
      <input type="text" [formControl]="control">
      <app-form-error [control]="control" [errorMessages]="errorMessages"></app-form-error>
    </form>
  `
})

class TestHostComponent {
  control = new FormControl('', [Validators.required, Validators.minLength(3)]);
  errorMessages = {
    required: () => 'This field is required.',
    minlength: () => 'Minimum length is 3 characters.'
  };
}

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [FormErrorComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    hostFixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show errors when control is pristine', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    const errorElement = hostFixture.debugElement.query(By.directive(FormErrorComponent));
    expect(errorElement.nativeElement.textContent).toBe('');
  });

  it('should show required error when control is touched and empty', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    const hostComponent = hostFixture.componentInstance;
    hostComponent.control.markAsTouched();
    hostFixture.detectChanges();
    const errorElement = hostFixture.debugElement.query(By.directive(FormErrorComponent));
    expect(errorElement.nativeElement.textContent).toBe('This field is required.');
  });

  it('should show minlength error when control value is too short', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    const hostComponent = hostFixture.componentInstance;
    hostComponent.control.setValue('ab');
    hostComponent.control.markAsTouched();
    hostFixture.detectChanges();
    const errorElement = hostFixture.debugElement.query(By.directive(FormErrorComponent));
    expect(errorElement.nativeElement.textContent).toBe('Minimum length is 3 characters.');
  });

  it('should show multiple errors', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    const hostComponent = hostFixture.componentInstance;
    hostComponent.control.setValue('');
    hostComponent.control.markAsTouched();
    hostFixture.detectChanges();
    const errorElement = hostFixture.debugElement.query(By.directive(FormErrorComponent));
    expect(errorElement.nativeElement.textContent).toBe('This field is required.');
  });
});
