// .envから設定値を取得し、エクスポートする

export const BACKEND_IP: string = process.env.REACT_APP_BACKEND_IP || '';
export const BACKEND_PORT: string = process.env.REACT_APP_BACKEND_PORT || '';
