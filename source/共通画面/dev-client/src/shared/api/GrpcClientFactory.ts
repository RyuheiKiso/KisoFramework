// gRPCクライアントを生成するファクトリ関数
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

/**
 * gRPCクライアントを生成する
 * @param protoPath protoファイルのパス
 * @param packageName パッケージ名
 * @param serviceName サービス名
 * @param address サーバーアドレス
 * @returns gRPCクライアントインスタンス
 */
export function createGrpcClient(
  protoPath: string,
  packageName: string,
  serviceName: string,
  address: string
) {
  // protoファイルをロード
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  // パッケージ定義からサービスを取得
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
  const Service = protoDescriptor[packageName][serviceName];
  // gRPCクライアントを生成して返却
  return new Service(address, grpc.credentials.createInsecure());
}
