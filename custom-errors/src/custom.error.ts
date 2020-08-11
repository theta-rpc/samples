import { JsonRPCError } from '@theta-rpc/errors';

// Custom error should extend from JsonRPCError
export class CustomError extends JsonRPCError {
    constructor(data?: string) {
        super({ code: -32768, message: 'Custom error', data });
    }
}
