import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { PromoCodeService } from "./promoCode.service";

const createPromoCode = catchAsync(async (req, res) => {
  const result = await PromoCodeService.createPromoCode(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PromoCode created successfully",
    data: result,
  });
});

const getAllPromoCode = catchAsync(async (req: Request, res: Response) => {
  const result = await PromoCodeService.getAllPromoCode();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PromoCode retrieved successfully",
    data: result,
  });
});

const deletePromoCode = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await PromoCodeService.DeletePromoCode(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PromoCode deleted successfully",
    data: result,
  });
});



export const PromoCodeController = {
  createPromoCode,
  getAllPromoCode,
  deletePromoCode,
};
