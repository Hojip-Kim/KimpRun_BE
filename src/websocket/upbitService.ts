import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { UpbitEventService } from 'src/sse_events/upbitEventService';

@Injectable()
export class UpbitService {
    private ws: WebSocket;

    constructor(private upbitEventService : UpbitEventService) {
        this.connectToUpbit();
    }

    private connectToUpbit() {
        const wsUrl = 'wss://api.upbit.com/websocket/v1';
        this.ws = new WebSocket(wsUrl);

        this.ws.on('open', () => {
            console.log('Connected to Upbit WebSocket');
            // 구독할 시장의 코드
            const subscribeMessage = JSON.stringify([{ ticket: "test" }, { type: "trade", codes: ["KRW-BTC", "KRW-ETH", "KRW-XRP", "KRW-IQ", "KRW-ID", "KRW-SC", "KRW-ZRX", "KRW-PYTH"] }]);
            this.ws.send(subscribeMessage);
        });

        this.ws.on('message', (data) => {
            const response = JSON.parse(data.toString());
            const sendData = {
                send : 'upbit',
                stream : response.code,
                price : response.trade_price,
                Quantity : response.trade_volume
            }
            this.upbitEventService.sendUpbitData(sendData);
        });

        this.ws.on('close', () => {
            console.log('Disconnected from Upbit WebSocket');
        });
    }
}
