import { ThetaRPCFactory } from '@theta-rpc/core';
import { Procedure, Method } from '@theta-rpc/common';
import { WsTransport, IWsTransportOptions } from '@theta-rpc/ws-transport';

@Procedure('machine')
class MachineMethods {

    @Method('sayHello')
    public sayHello() {
      return 'Hello!';
    }
}


/*
   -> {"jsonrpc": "2.0", "method": "machine.sayHello", "id": 1}
   <- {"jsonrpc": "2.0", "result": "Hello!", "id": 1}
*/


ThetaRPCFactory.create<IWsTransportOptions>({
    server: {
        transport: WsTransport,
        transportOptions: {
            hostname: '127.0.0.1',
            port: 8080,
            endpoint: '/json-rpc'
        }
    },
    procedures: [MachineMethods]
})
