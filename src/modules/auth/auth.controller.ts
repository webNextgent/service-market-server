import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { otpService } from "./otp.service";
import { catchAsync } from "../../utils/catchAsync";

export const sendOtpHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { phone } = req.body;

    if (!phone) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Phone is required",
        data: null,
      });
    }

    const result = await otpService.sendOTP({ phone });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP sent successfully",
      data: result,
    });
  }
);

export const verifyOtpHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Phone and OTP are required",
        data: null,
      });
    }
    const result = await otpService.verifyOTP({ phone, otp });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP verified successfully",
      data: result,
    });
  }
);
