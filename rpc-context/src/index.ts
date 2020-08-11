import { ThetaRPCFactory} from '@theta-rpc/core';
import { Procedure, Method } from '@theta-rpc/common';
import { HttpTransport, IHttpTransportOptions } from '@theta-rpc/http-transport';

@Procedure('machine')
class MachineMethods {

    @Method('requestContext')
    public context(context: IContext) {
      return context;
    }
}


/*
   -> {"jsonrpc": "2.0", "method": "machine.requestContext", "id": 1}
   <- {"jsonrpc":"2.0","result":{"id":1,"method":"machine.requestContext","params":null,"inBatchScope":false,"isNotification":false,"rpcBody":{"jsonrpc":"2.0","method":"machine.requestContext","params":null,"id":1}},"id":1}

   -> [{"jsonrpc": "2.0", "method": "machine.requestContext", "id": 1}]
   <- [{"jsonrpc":"2.0","result":{"id":1,"method":"machine.requestContext","params":null,"inBatchScope":true,"isNotification":false,"rpcBody":{"jsonrpc":"2.0","method":"machine.requestContext","params":null,"id":1}},"id":1}]

*/


ThetaRPCFactory.create<IHttpTransportOptions>({
    server: {
        transport: HttpTransport,
        transportOptions: {
            hostname: '127.0.0.1',
            port: 8080,
            endpoint: '/json-rpc'
        }
    },
    procedures: [MachineMethods]
})
