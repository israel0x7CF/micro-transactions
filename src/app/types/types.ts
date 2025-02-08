export interface serverActionResponse<T> {
    status:boolean,
    data:T | null | undefined
}
export interface paymentResponse{
    status:boolean,
    txRef:string,

}