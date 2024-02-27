import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { EventService } from '../eventService';

@Injectable()
export class UpbitService {
    private ws: WebSocket;

    constructor(private eventService : EventService) {
        this.connectToUpbit();
    }

    private connectToUpbit() {
        const wsUrl = 'wss://api.upbit.com/websocket/v1';
        this.ws = new WebSocket(wsUrl);

        this.ws.on('open', () => {
            console.log('Connected to Upbit WebSocket');
            // 구독할 시장의 코드
            const subscribeMessage = JSON.stringify([{ ticket: "test" }, { type: "trade", codes: ["KRW-BTC", "KRW-ETH"] }]);
            this.ws.send(subscribeMessage);
        });

        this.ws.on('message', (data) => {
            const response = JSON.parse(data.toString());
            console.log(`upbit : Market: ${response.code}, Trade Price: ${response.trade_price}, Trade Volume: ${response.trade_volume}`);

            this.eventService.sendData(`upbit Stream : ${response.code}, trade.p : ${response.trade_price}`)
        });

        this.ws.on('close', () => {
            console.log('Disconnected from Upbit WebSocket');
        });
    }
}
