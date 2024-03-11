import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { BinanceEventService } from 'src/sse_events/binanceEventService';

@Injectable()
export class BinanceService {
    private ws : WebSocket;
    

    constructor(private binanceEventService : BinanceEventService){
        this.connectToBinance();
    }

    private connectToBinance(){
        const streamNames = ['btcusdt@trade', 'ethusdt@trade', 'xrpusdt@trade', 'iqusdt@trade', 'idusdt@trade', 'scusdt@trade', 'zrxusdt@trade', 'pythusdt@trade'].join('/'); // btc-usdt
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
            const trade = message.data
            
            const sendData = {
                send : 'binance',
                stream : trade.s,
                price : trade.p,
                Quantity : trade.q
            }

            this.binanceEventService.sendBinanceData(sendData); // binance data front-end server로 전송
        });

        this.ws.on('close', () => {
            console.log('Disconnected from Binance WebSocket');
        })
    }


}