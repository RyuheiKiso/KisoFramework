// .envから取得した設定値を定数として定義

import { BACKEND_IP, BACKEND_PORT } from '../config/env';

// バックエンドAPIサーバのIPアドレス定数
export const API_SERVER_IP = BACKEND_IP;

// バックエンドAPIサーバのポート番号定数
export const API_SERVER_PORT = BACKEND_PORT;
