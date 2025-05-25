// Polyfill for setImmediate in Jest environment
if (typeof setImmediate === 'undefined') {
  (global as any).setImmediate = (fn: (...args: any[]) => void, ...args: any[]) => setTimeout(fn, 0, ...args);
}

import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { createGrpcClient } from '../../../shared/api/GrpcClientFactory';

describe('createGrpcClient', () => {
  const PROTO_PATH = path.resolve(__dirname, 'test.proto');
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
  const TestService = protoDescriptor.testPkg.TestService;
  let server: grpc.Server;
  let client: any;
  const address = '127.0.0.1:50052';

  beforeAll((done) => {
    server = new grpc.Server();
    server.addService(TestService.service, {
      UnaryCall: (call: any, callback: any) => {
        const id = call.request.id;
        callback(null, { message: `Received id: ${id}` });
      },
    });
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) return done(err);
      server.start();
      client = createGrpcClient(PROTO_PATH, 'testPkg', 'TestService', address);
      done();
    });
  });

  afterAll(() => {
    server.forceShutdown();
  });

  it('should call UnaryCall and receive correct response', (done) => {
    client.UnaryCall({ id: 42 }, (err: Error | null, response: any) => {
      expect(err).toBeNull();
      expect(response).toEqual({ message: 'Received id: 42' });
      done();
    });
  });
});
