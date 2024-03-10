import { Injectable } from '@nestjs/common';
import { EventService } from './eventService';

@Injectable()
export class BinanceEventService extends EventService {
    constructor(
    ){
        super();
    }

    async sendBinanceData(data: any){
        await this.sendData(data);
    }

    getBinanceData(){
        return this.getData();
    }
}