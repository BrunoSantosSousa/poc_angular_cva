import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test function isTime', () => {
    it('should return null', () => {
      const formControl = new FormControl();
      formControl.setValue('2401');
      const errors = service.isTime(formControl);
      expect(errors).toBeNull();
    });
  });
});
