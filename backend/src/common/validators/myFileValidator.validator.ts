import { FileValidator } from '@nestjs/common';
import { Express } from 'express'
import * as fileType from 'file-type-mime';

export interface MyTypeValidatorOptions {
  fileType: string[];
}

export class MyFileTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];

  constructor(protected readonly validationOptions: MyTypeValidatorOptions) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.fileType;
  }

  public isValid(file?: Express.Multer.File): boolean {
    if (!file)
      return false;
    const response = fileType.parse(file.buffer);
    return this._allowedMimeTypes.includes(response.mime);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
      ', ',
    )}`;
  }
}