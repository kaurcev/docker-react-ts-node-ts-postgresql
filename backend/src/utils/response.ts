export const successResponse = (msg: string, data: any = null) => ({
  status: true,
  msg,
  data
});

export const errorResponse = (msg: string, data: any = null) => ({
  status: false,
  msg,
  data
});

export const sendSuccess = (res: any, msg: string, data: any = null, statusCode: number = 200) => {
  res.status(statusCode).json(successResponse(msg, data));
};

export const sendError = (res: any, msg: string, data: any = null, statusCode: number = 400) => {
  res.status(statusCode).json(errorResponse(msg, data));
};