import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { EventService } from '../sse_events/eventService';

@Injectable()
export class BinanceService {
    private ws : WebSocket;
    

    constructor(private eventService : EventService){
        // this.connectToBinance();
    }

    private connectToBinance(){
        const streamNames = ['btcusdt@trade', 'ethusdt@trade'].join('/'); // btc-usdt
        const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streamNames}`; // binance 요청 url
        this.ws = new WebSocket(wsUrl);

        this.ws.on('open', () => {
            console.log('Connected to Binance WebSocket');
        })

        /*
        trade.p : 코인가격
        trade.q : 결제 양 (amount)
        trade.s : 결제 통화(usdt ~)
         */
        this.ws.on('message', (data) => {
            const message = JSON.parse(data.toString());
            const stream = message.stream;
            const trade = message.data
            // console.log(`binance : Stream : ${stream}, Price: ${trade.p}, Quantity: ${trade.q}`);
            
            this.eventService.sendData(`binance Stream : ${stream}, trade.p : ${trade.p}`);
        });

        this.ws.on('close', () => {
            console.log('Disconnected from Binance WebSocket');
        })
    }


}