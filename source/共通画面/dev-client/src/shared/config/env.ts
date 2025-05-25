// .envから設定値を取得し、エクスポートする

// バックエンドAPIサーバのIPアドレスを環境変数から取得
export const BACKEND_IP: string = process.env.REACT_APP_BACKEND_IP || '';

// バックエンドAPIサーバのポート番号を環境変数から取得
export const BACKEND_PORT: string = process.env.REACT_APP_BACKEND_PORT || '';
