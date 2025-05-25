// HTTPメソッドの型定義
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
// API種別の型定義
export type ApiType = 'REST' | 'gRPC';

// APIクライアントのオプション定義
export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  apiType?: ApiType;
  grpcClient?: any; // gRPCクライアントインスタンス
}

// gRPCメタデータ型をインポート
import type { Metadata } from '@grpc/grpc-js';

/**
 * APIクライアントクラス
 */
export class ApiClient {
  // ベースURL
  private baseUrl: string;
  // HTTPヘッダー
  private headers: Record<string, string>;
  // API種別
  private apiType: ApiType;
  // gRPCクライアント
  private grpcClient: any;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options?: ApiClientOptions) {
    // ベースURLを設定
    this.baseUrl = options?.baseUrl || '';
    // ヘッダーを設定
    this.headers = options?.headers || { 'Content-Type': 'application/json' };
    // API種別を設定
    this.apiType = options?.apiType || 'REST';
    // gRPCクライアントを設定
    this.grpcClient = options?.grpcClient;
  }

  /**
   * HTTPリクエストを送信する
   * @param endpoint エンドポイント
   * @param method HTTPメソッド
   * @param body リクエストボディ
   * @param customHeaders カスタムヘッダー
   * @param timeoutMs タイムアウト(ミリ秒)
   * @returns レスポンス
   */
  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    body?: any,
    customHeaders?: Record<string, string>,
    timeoutMs: number = 10000
  ): Promise<T> {
    // URLを生成
    const url = this.baseUrl + endpoint;
    // ヘッダーをマージ
    const headers = { ...this.headers, ...customHeaders };

    // fetchでリクエスト送信（タイムアウト対応）
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new Error('API request timeout');
      }
      throw err;
    }
    clearTimeout(timeout);

    // エラーハンドリング
    if (!response.ok) {
      // レスポンスボディも含めて例外を投げる
      const errorBody = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    // レスポンスのContent-Typeを確認
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    // 必要に応じて他の型も対応
    return response.text() as unknown as T;
  }

  /**
   * GETリクエスト
   * @param endpoint エンドポイント
   * @param headers ヘッダー
   */
  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, 'GET', undefined, headers);
  }

  /**
   * POSTリクエスト
   * @param endpoint エンドポイント
   * @param body リクエストボディ
   * @param headers ヘッダー
   */
  post<T>(endpoint: string, body: any, headers?: Record<string, string>) {
    return this.request<T>(endpoint, 'POST', body, headers);
  }

  /**
   * PUTリクエスト
   * @param endpoint エンドポイント
   * @param body リクエストボディ
   * @param headers ヘッダー
   */
  put<T>(endpoint: string, body: any, headers?: Record<string, string>) {
    return this.request<T>(endpoint, 'PUT', body, headers);
  }

  /**
   * DELETEリクエスト
   * @param endpoint エンドポイント
   * @param headers ヘッダー
   */
  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, 'DELETE', undefined, headers);
  }

  /**
   * gRPC呼び出し
   * @param method メソッド名
   * @param requestData リクエストデータ
   * @param metadata メタデータ（ヘッダー）
   * @returns レスポンス
   */
  async grpcCall<T>(method: string, requestData: any, metadata?: Record<string, string>): Promise<T> {
    // gRPCクライアントが初期化されているか確認
    if (!this.grpcClient) {
      throw new Error('gRPC client is not initialized.');
    }
    // gRPCメタデータ生成
    let metaObj: Metadata | undefined;
    if (metadata) {
      const grpcMeta = require('@grpc/grpc-js').Metadata;
      metaObj = new grpcMeta();
      for (const key in metadata) {
        if (metaObj) {
          metaObj.set(key, metadata[key]);
        }
      }
    }
    // gRPCメソッドを呼び出し
    return new Promise<T>((resolve, reject) => {
      if (metaObj) {
        this.grpcClient[method](requestData, metaObj as Metadata, (err: any, response: T) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      } else {
        this.grpcClient[method](requestData, (err: any, response: T) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      }
    });
  }

  /**
   * REST/gRPC自動切替呼び出し
   * @param params 呼び出しパラメータ
   * @returns レスポンス
   */
  async call<T>(params: {
    endpoint?: string;
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    grpcMethod?: string;
    grpcRequest?: any;
    grpcMetadata?: Record<string, string>;
    timeoutMs?: number;
  }): Promise<T> {
    if (this.apiType === 'REST') {
      if (!params.endpoint || !params.method) {
        throw new Error('REST呼び出しにはendpointとmethodが必要です');
      }
      return this.request<T>(
        params.endpoint,
        params.method,
        params.body,
        params.headers,
        params.timeoutMs
      );
    } else if (this.apiType === 'gRPC') {
      if (!params.grpcMethod || !params.grpcRequest) {
        throw new Error('gRPC呼び出しにはgrpcMethodとgrpcRequestが必要です');
      }
      return this.grpcCall<T>(
        params.grpcMethod,
        params.grpcRequest,
        params.grpcMetadata
      );
    } else {
      throw new Error('不明なAPI種別です');
    }
  }
}
