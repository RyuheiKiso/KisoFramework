import { ApiClient } from '../../../shared/api/ApiClient';

describe('ApiClient (REST)', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('GET が JSON レスポンスを返す', async () => {
    const mockData = { foo: 'bar' };
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => mockData,
    });
    const client = new ApiClient({ baseUrl: 'https://api.test', apiType: 'REST' });
    await expect(client.get('/path')).resolves.toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test/path',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('エラー時に例外を投げる', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({ ok: false, status: 500, statusText: 'Err', text: async () => 'err' });
    const client = new ApiClient({ baseUrl: '', apiType: 'REST' });
    await expect(client.get('/')).rejects.toThrow('API error: 500 Err - err');
  });

  it('タイムアウト時に例外を投げる', async () => {
    // @ts-ignore
    global.fetch.mockImplementation(() => {
      const err: any = new Error();
      err.name = 'AbortError';
      return Promise.reject(err);
    });
    const client = new ApiClient({ baseUrl: '', apiType: 'REST' });
    await expect(client.get('/', undefined)).rejects.toThrow('API request timeout');
  });

  // 追加: POST
  it('POST が JSON レスポンスを返す', async () => {
    const payload = { a: 1 };
    const mockData = { result: 'ok' };
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => mockData,
    });
    const client = new ApiClient({ baseUrl: 'https://api', apiType: 'REST' });
    await expect(client.post('/x', payload)).resolves.toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api/x',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(payload),
      })
    );
  });

  // 追加: PUT
  it('PUT が JSON レスポンスを返す', async () => {
    const payload = { b: 2 };
    const mockData = { updated: true };
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => mockData,
    });
    const client = new ApiClient({ baseUrl: '', apiType: 'REST' });
    await expect(client.put('/u', payload)).resolves.toEqual(mockData);
  });

  // 追加: DELETE
  it('DELETE がテキストレスポンスを返す', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/plain' },
      text: async () => 'gone',
    });
    const client = new ApiClient({ baseUrl: '/b', apiType: 'REST' });
    await expect(client.delete('/d')).resolves.toBe('gone');
  });

  // 追加: カスタムヘッダー
  it('カスタムヘッダーが送信される', async () => {
    const custom = { 'X-Test': '123' };
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({}),
    });
    const client = new ApiClient({ baseUrl: '/b', apiType: 'REST' });
    await client.get('/h', custom);
    expect(global.fetch).toHaveBeenCalledWith(
      '/b/h',
      expect.objectContaining({ headers: expect.objectContaining(custom) })
    );
  });

  it('非JSONの場合GETはfallbackでtextを返す', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/html' },
      text: async () => '<html></html>',
    });
    const client = new ApiClient({ baseUrl: '', apiType: 'REST' });
    await expect(client.get('/html')).resolves.toBe('<html></html>');
  });
});

describe('ApiClient (gRPC)', () => {
  it('grpcCall がレスポンスを返す', async () => {
    const fakeClient: any = {
      testMethod: (req: any, cb: any) => cb(null, { echoed: req.value }),
    };
    const client = new ApiClient({ apiType: 'gRPC', grpcClient: fakeClient });
    const res = await client.grpcCall<{ echoed: string }>('testMethod', { value: 'hello' });
    expect(res).toEqual({ echoed: 'hello' });
  });

  it('metadataを渡して呼び出せる', async () => {
    const calls: any[] = [];
    const fakeClient: any = {
      mtd: (req: any, meta: any, cb: any) => {
        calls.push({ req, meta });
        cb(null, 'OK');
      },
    };
    const client = new ApiClient({ apiType: 'gRPC', grpcClient: fakeClient });
    await expect(client.grpcCall('mtd', { x: 1 }, { 'X-M': 'v' })).resolves.toBe('OK');
    expect(calls[0].meta.get('X-M')).toEqual(['v']);
  });

  it('grpcClient未設定でgrpcCallはエラー', async () => {
    const client = new ApiClient({ apiType: 'gRPC' });
    await expect(client.grpcCall('m', {})).rejects.toThrow('gRPC client is not initialized.');
  });
});

describe('ApiClient.call()', () => {
  it('REST モードで call が HTTP リクエストを行う', async () => {
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ ok: true }),
    });
    const client = new ApiClient({ baseUrl: '/b', apiType: 'REST' });
    await expect(client.call({ endpoint: '/e', method: 'GET' })).resolves.toEqual({ ok: true });
  });

  it('gRPC モードで call が grpcCall を呼ぶ', async () => {
    const fakeClient: any = { gm: (_: any, cb: any) => cb(null, 'OK') };
    const client = new ApiClient({ apiType: 'gRPC', grpcClient: fakeClient });
    await expect(client.call({ grpcMethod: 'gm', grpcRequest: {} })).resolves.toBe('OK');
  });
});

// 追加: call() のエラーケース
describe('ApiClient.call パラメーターエラー', () => {
  it('REST モードで endpoint/method が不足すると例外', async () => {
    const client = new ApiClient({ apiType: 'REST' });
    await expect(client.call({ method: 'GET' } as any)).rejects.toThrow(
      'REST呼び出しにはendpointとmethodが必要です'
    );
    await expect(client.call({ endpoint: '/e' } as any)).rejects.toThrow(
      'REST呼び出しにはendpointとmethodが必要です'
    );
  });

  it('gRPC モードで grpcMethod/grpcRequest が不足すると例外', async () => {
    const client = new ApiClient({ apiType: 'gRPC', grpcClient: {} });
    await expect(client.call({ grpcRequest: {} } as any)).rejects.toThrow(
      'gRPC呼び出しにはgrpcMethodとgrpcRequestが必要です'
    );
    await expect(client.call({ grpcMethod: 'm' } as any)).rejects.toThrow(
      'gRPC呼び出しにはgrpcMethodとgrpcRequestが必要です'
    );
  });
});

describe('ApiClient.call その他エラー', () => {
  it('未知のapiTypeでcallは例外', async () => {
    const client = new ApiClient({ apiType: 'UNKNOWN' as any });
    await expect(client.call({} as any)).rejects.toThrow('不明なAPI種別です');
  });
});
