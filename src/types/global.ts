export type TError = {
  data: {
    message: string;
    stack: string;
    successs: boolean;
  };
  status: number;
};

export type TResponse = {
  data?: any;
  error?: TError;
};
export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
