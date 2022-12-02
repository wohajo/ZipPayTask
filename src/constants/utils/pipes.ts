import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import validator from 'validator';

@Injectable()
export class DefaultPagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return checkNumberPresenceOrDefault(value, 0);
  }
}

@Injectable()
export class DefaultTakePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const _value = checkNumberPresenceOrDefault(value, 10);
    return _value > 100 ? 100 : _value;
  }
}

@Injectable()
export class IsUuidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (validator.isUUID(value)) return value;
    else
      throw new BadRequestException(
        'Invalid id format. Should be UUID string.',
      );
  }
}

function checkNumberPresenceOrDefault(value: any, _default: any) {
  if (isNaN(value)) return _default;
  else return value;
}
