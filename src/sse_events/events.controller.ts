import { Controller, Sse } from '@nestjs/common';
import { EventService } from './eventService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sseInterface } from './interface/sseInterface';

@Controller('events')
export class EventsController {

    constructor(private eventService : EventService){}

    @Sse('stream')
    streamEvents(): Observable<sseInterface> {

        return this.eventService.getData().pipe(
            map(data => ({ data: JSON.stringify(data) }))
        );
    }

}
