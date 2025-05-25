// Polyfill for setImmediate in Jest environment
if (typeof setImmediate === 'undefined') {
  (global as any).setImmediate = (fn: (...args: any[]) => void, ...args: any[]) => setTimeout(fn, 0, ...args);
}

import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { createGrpcClient } from '../../../shared/api/GrpcClientFactory';

jest.setTimeout(20000); // テスト全体のタイムアウトを20秒に延長

// gRPCクライアントのコネクション確立を待つヘルパー
function waitForClientReady(client: any, timeout = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    client.waitForReady(Date.now() + timeout, (err: Error | null) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// gRPCコールをPromise化するヘルパー
function unaryCallAsync(client: any, method: string, req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client[method](req, (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

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

  // サーバーを毎回起動・停止する
  beforeEach((done) => {
    setTimeout(() => {
      server = new grpc.Server();
      server.addService(TestService.service, {
        UnaryCall: (call: any, callback: any) => {
          const id = call.request.id;
          callback(null, { message: `Received id: ${id}` });
        },
      });
      server.bindAsync(address, grpc.ServerCredentials.createInsecure(), async (err, port) => {
        if (err) return done(err);
        server.start();
        client = createGrpcClient(PROTO_PATH, 'testPkg', 'TestService', address);
        try {
          await waitForClientReady(client, 5000);
          setTimeout(done, 200);
        } catch (e) {
          done(e);
        }
      });
    }, 200); // 前回のサーバー停止・ポート解放待ち
  });

  afterEach((done) => {
    server.tryShutdown(() => {
      setTimeout(done, 200); // ポート解放待ち時間を増やす
    });
  });

  it('should call UnaryCall and receive correct response', async () => {
    await waitForClientReady(client);
    const response = await unaryCallAsync(client, 'UnaryCall', { id: 42 });
    expect(response).toEqual({ message: 'Received id: 42' });
  });

  it('should handle multiple sequential calls', async () => {
    await waitForClientReady(client);
    const res1 = await unaryCallAsync(client, 'UnaryCall', { id: 1 });
    expect(res1).toEqual({ message: 'Received id: 1' });
    const res2 = await unaryCallAsync(client, 'UnaryCall', { id: 2 });
    expect(res2).toEqual({ message: 'Received id: 2' });
  });

  it('should handle missing required field (id)', async () => {
    await waitForClientReady(client);
    const response = await unaryCallAsync(client, 'UnaryCall', {});
    expect(response).toEqual({ message: 'Received id: 0' });
  });

  it('should return error if server is down', async () => {
    server.forceShutdown();
    const badClient = createGrpcClient(PROTO_PATH, 'testPkg', 'TestService', address);
    try {
      await waitForClientReady(badClient, 1000);
    } catch {
      // readyにならないのが正常
    }
    await expect(
      unaryCallAsync(badClient, 'UnaryCall', { id: 99 })
    ).rejects.toBeTruthy();
  });

  it('should throw if protoPath is invalid', () => {
    expect(() => {
      createGrpcClient('invalid/path/to.proto', 'testPkg', 'TestService', address);
    }).toThrow();
  });

  it('should throw if packageName is invalid', () => {
    expect(() => {
      createGrpcClient(PROTO_PATH, 'invalidPkg', 'TestService', address);
    }).toThrow();
  });

  it('should throw if serviceName is invalid', () => {
    expect(() => {
      createGrpcClient(PROTO_PATH, 'testPkg', 'InvalidService', address);
    }).toThrow();
  });

  it('should handle negative id', async () => {
    await waitForClientReady(client);
    const response = await unaryCallAsync(client, 'UnaryCall', { id: -123 });
    expect(response).toEqual({ message: 'Received id: -123' });
  });

  it('should handle large id', async () => {
    await waitForClientReady(client);
    const response = await unaryCallAsync(client, 'UnaryCall', { id: 2147483647 });
    expect(response).toEqual({ message: 'Received id: 2147483647' });
  });

  it('should handle id as string (should coerce or fail)', async () => {
    await waitForClientReady(client);
    const response = await unaryCallAsync(client, 'UnaryCall', { id: '100' });
    expect(response).toEqual({ message: 'Received id: 100' });
  });

  it('should handle null as request', async () => {
    await waitForClientReady(client);
    await expect(
      unaryCallAsync(client, 'UnaryCall', null)
    ).rejects.toBeTruthy();
  });

  it('should handle undefined as request', async () => {
    await waitForClientReady(client);
    await expect(
      unaryCallAsync(client, 'UnaryCall', undefined)
    ).rejects.toBeTruthy();
  });
});