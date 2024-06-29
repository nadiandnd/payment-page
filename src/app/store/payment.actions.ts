
export class SubmitPayment {
    static readonly type = '[Payment] Submit Payment';
    constructor(public payload: any) {}
}

export class PaymentSuccess {
    static readonly type = '[Payment] Payment Success';
    constructor(public message: string, public invoice: string) {}
}

export class PaymentFailure {
    static readonly type = '[Payment] Payment Failure';
    constructor(public error: any) {}
}