import { Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs-compat/operator/startWith';

export class Option {
  control: FormControl;
  constructor(
    public value: string,
    @Optional() public label: string = null,
    @Optional() public checked: boolean = null
  ) {
    if (!this.label) {
      this.label = this.value;
    }
    if (this.checked !== null) {
      this.control = new FormControl(this.checked);
      this.control.setValue(this.checked);
    }
  }

  setChecked(checked: boolean): void {
    this.control.setValue(checked);
  }
}

export class FormField {
  constructor(
    public name: string,
    public label: string,
    public type: string,
    @Optional() public options: Option[] = [],
  ) {}
  setOptions(options: Option[]): void {
    this.options = options;
  }
  getOption(value: string): Option {
    for (const opt of this.options) {
      if (opt.value === value) {
        return opt;
      }
    }
    return null;
  }
  getValues() {
    return this.options.filter((option) => {
      if (option.control.value) {
        return true;
      }
      return false;
    }).map(option => option.value);
  }
}

export class Meta {
  drivers?: [];
  languages?: [];
  static drivers(drivers: any) {
    throw new Error('Method not implemented.');
  }
  static languages(languages: any) {
    throw new Error('Method not implemented.');
  }
}
