import { ThetaRPCFactory, IContext } from '@theta-rpc/core';
import { Procedure, Method } from '@theta-rpc/common';
import { HttpTransport, IHttpTransportOptions } from '@theta-rpc/http-transport';
import { InvalidParamsError } from '@theta-rpc/errors';

import { IExpectedParams } from './interfaces';

@Procedure('machine')
class MachineMethods {

    @Method('toUpperCase')
    public toUpperCase(context: IContext<IExpectedParams>) {
        const { params } = context;

        if (params && params.text && typeof params.text === 'string') {
            return params.text.toUpperCase();
        }

        throw new InvalidParamsError();
    }
}


/*
   -> {"jsonrpc": "2.0", "method": "machine.toUpperCaes", "params" {"text": "hello"}, "id": 1}
   <- {"jsonrpc": "2.0", "result": "HELLO", "id": 1}

   -> {"jsonrpc": "2.0", "method": "machine.toUpperCase", "id": 1}
   <- {"jsonrpc": "2.0", "error": {"code": -32602, "message": "Invalid params"}, "id": null}
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
