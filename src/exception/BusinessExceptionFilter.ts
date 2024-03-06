import { ExceptionFilter,Catch, Logger, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BusinessException, ErrorDomain } from './BusinessException';
import { Request, Response } from 'express';

export interface ApiError {
    id: string;
    domain : ErrorDomain;
    message : string;
    timestamp : Date;
}

@Catch(Error)
export class BusinessExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(BusinessExceptionFilter.name);

    catch(exception: Error, host: ArgumentsHost){
        let body: ApiError;
        let status : HttpStatus;

        if (exception instanceof BusinessException) {
            status = exception.status;
            body = {
                id : exception.id,
                domain: exception.domain,
                message: exception.message,
                timestamp: exception.timestamp
            };
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            body = new BusinessException(
                'generic',
                `Internal server error : ${exception.message}`,
                'Internal server error',
                exception.getStatus(),
            );
        }else{
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            body = new BusinessException(
                'generic',
                `Internal server error: ${exception.message}`,
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        this.logger.error(
            `exception : ${JSON.stringify({
                path: request.url,
                ...body
            })}`,
        );

        response.status(status).json(body);
    }
}