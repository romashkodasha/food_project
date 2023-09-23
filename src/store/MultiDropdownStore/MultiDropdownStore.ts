import { makeObservable, observable, action, computed } from 'mobx';

type PrivateFields = '_isDropdownOpen' | '_inputValue'

export default class MultiDropdownStore {
  private _isDropdownOpen: boolean = false;
  private _inputValue: string = '';

  constructor() {
    makeObservable<MultiDropdownStore, PrivateFields> (this, {
      _isDropdownOpen: observable,
      _inputValue: observable,
      isDropdownOpen: computed,
      inputValue: computed,
      setIsDropdownOpen: action,
      setInputValue: action,
    });
  }

  get isDropdownOpen(): boolean{
    return this._isDropdownOpen
  }

  get inputValue(): string{
    return this._inputValue
  }

  setIsDropdownOpen(value: boolean) {
    this._isDropdownOpen = value;
  }

  setInputValue(value: string) {
    this._inputValue = value;
  }

}