import { Injectable } from '@nestjs/common';
import { Cron , CronExpression } from '@nestjs/schedule'

@Injectable()
export class ExportTradePair {

    //binance trading pair를 가져오는 함수
    async fetchBinancePairs() {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const data = await response.json();
        console.log(data.symbols.map(symbol => symbol.symbol));
        return data.symbols.map(symbol => symbol.symbol);
    }

    //upbit trading pair를 가져오는 함수
    async fetchUpbitPairs(){
        const response = await fetch('https://api.upbit.com/v1/market/ALL');
        const data = await response.json();
        console.log(data.map(market => market.market));
        return data.map(market => market.market);
    }

    // TODO : binance, upbit페어를 가져온 후, 공통페어를 찾는 메소드 (스케쥴링, 매 오전 10시마다)
    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async exportPair(){
        const binanceArray = this.fetchBinancePairs();
        const upbitArray = this.fetchUpbitPairs();
    }

    // TODO : binance, upbit 공통페어를 찾는 메소드
    // const findCommonPairs = (firstPairs, secondPairs) => {
    //     const normalizedFirstPairs = firstPairs.map(pair => pair.replace(/^(KRW-|BTC-)^/, '')).filter((value, index, self) => self.indexOf(value) === index);
    //     const normalizedsecondPairs = secondPairs.map(pair => pair.replace(/^(KRW-|BTC-)^/, '')).filter((value, index, self) => self.indexOf(value) === index);
    // }
}