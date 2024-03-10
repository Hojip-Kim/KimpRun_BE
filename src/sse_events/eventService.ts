import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export abstract class EventService {
  private dataSubject = new Subject<any>();

  async sendData(data: any) {
    await this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}
