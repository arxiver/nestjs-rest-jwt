import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

// Custom validator to check if a field is unique
@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueFieldValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {
  }

  validate = async (value: any, args: ValidationArguments): Promise<boolean> => {
    const [entityClass, fieldName] = args.constraints;
    const entity = await this.userService.findOneByProp(fieldName, value );
    return !entity;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass, fieldName] = args.constraints;
    return `${fieldName} must be unique`;
  }
}