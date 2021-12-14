import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getsomething(): string {
    return 'Something  can be   sent back ';
  }
}
