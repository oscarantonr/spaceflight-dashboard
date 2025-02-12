import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TitleComponent } from '../../../shared/title/title.component';
import { ValidatorsService } from '../../../services/validators.service';

@Component({
  selector: 'app-register-user',
  imports: [CommonModule, TitleComponent, ReactiveFormsModule],
  templateUrl: './register-user.component.html'
})

export default class RegisterUserComponent {
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]],
    }, {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
      ]
    });
  }

  get nameFieldInvalid() {
    return this.validatorsService.isValidField(this.myForm, 'name');
  }

  get passwordFieldInvalid() {
    return this.validatorsService.isValidField(this.myForm, 'password');
  }

  get password2FieldInvalid() {
    return this.validatorsService.isValidField(this.myForm, 'password2');
  }

  get emailFieldInvalid() {
    return this.validatorsService.isValidField(this.myForm, 'email');
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
