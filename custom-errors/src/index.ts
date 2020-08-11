import { ThetaRPCFactory } from '@theta-rpc/core';
import { Procedure, Method } from '@theta-rpc/common';
import { HttpTransport, IHttpTransportOptions } from '@theta-rpc/http-transport';

import { CustomError } from './custom.error';
@Procedure('machine')
class MachineMethods {

    @Method('sayHello')
    public sayHello() {
        // throw an error
        throw new CustomError('Message');
    }
}


/*
  -> {"jsonrpc": "2.0", "method": "machine.sayHello", "id": 1}
  <- {"jsonrpc": "2.0", "error": {"code": -32768, "message": "Custom error", "data": "Message"}, "id": 1}
*/

ThetaRPCFactory.create<IHttpTransportOptions>({
    server: {
        transport: HttpTransport,
        transportOptions: {
            port: 8080,
            endpoint: '/json-rpc'
        }
    },
    procedures: [MachineMethods]
})
