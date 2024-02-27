import { Controller, Sse } from '@nestjs/common';
import { EventService } from '../service/eventService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sseInterface } from '../service/sseInterface';

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
