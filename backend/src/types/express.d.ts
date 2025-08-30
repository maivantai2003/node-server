import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      currentUser?: any; // hoặc kiểu dữ liệu của JWT decode
    }
  }
}
