import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TitleComponent } from '../../../shared/title/title.component';
import { ValidatorsService } from '../../../services/validators.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html'
})
export default class ContactComponent {

  public contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    })
  }


  get nameFieldInvalid() {
    return this.validatorsService.isValidField(this.contactForm, 'name');
  }

  get emailFieldInvalid() {
    return this.validatorsService.isValidField(this.contactForm, 'email');
  }

  get messageFieldInvalid() {
    return this.validatorsService.isValidField(this.contactForm, 'message');
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();
  }
}
