// .envから取得した設定値を定数として定義

import { BACKEND_IP, BACKEND_PORT } from '../config/env';

// バックエンドAPIサーバのIPアドレス
export const API_SERVER_IP = BACKEND_IP;

// バックエンドAPIサーバのポート番号
export const API_SERVER_PORT = BACKEND_PORT;
