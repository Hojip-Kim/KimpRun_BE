export interface sseInterface{
    data : string | object;
    id? : string;
    type? : string;
    retry? : number;
}