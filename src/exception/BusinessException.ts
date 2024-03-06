import { HttpStatus } from '@nestjs/common';

export type ErrorDomain = 'auth' | 'generic' | 'user'

export class BusinessException extends Error {
    public readonly id : string;
    public readonly timestamp : Date;

    constructor(
        public readonly domain : ErrorDomain,
        public readonly message : string, // Logging Message
        public readonly apiMessage : string, // Client Message
        public readonly status : HttpStatus,
    ){
        super(message);
        this.id = BusinessException.genId();
        this.timestamp = new Date();
    }

    private static genId(length = 12): string {
        const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeasf0123456';
        return [...Array(length)].reduce(
            (a) => a + p[Math.floor(Math.random() * p.length)]
        )
    }
}