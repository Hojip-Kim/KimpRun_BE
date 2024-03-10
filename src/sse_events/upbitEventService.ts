import { Injectable } from '@nestjs/common';
import { EventService } from './eventService';

@Injectable()
export class UpbitEventService extends EventService {
    constructor(
    ){
        super();
    }

    async sendUpbitData(data: any){
        await this.sendData(data);
    }

    getUpbitData(){
        return this.getData();
    }
}