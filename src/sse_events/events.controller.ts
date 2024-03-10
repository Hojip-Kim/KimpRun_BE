import { Controller, Sse } from '@nestjs/common';
import { EventService } from './eventService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sseInterface } from './interface/sseInterface';
import { BinanceEventService } from './binanceEventService';
import { UpbitEventService } from './upbitEventService';

@Controller('events')
export class EventsController {

    constructor(private binanceEventService : BinanceEventService,
        private upbitEventService : UpbitEventService){}

    @Sse('binance')
    async binanceEvents(): Promise<Observable<sseInterface>> {

        return await this.binanceEventService.getBinanceData().pipe(
            map(data => ({ data: JSON.stringify(data) }))
        );
    }

    @Sse('upbit')
    async upbitEvents(): Promise<Observable<sseInterface>>{

        return await this.upbitEventService.getUpbitData().pipe(
            map(data => ({ data: JSON.stringify(data)}))
        );
    }

}
