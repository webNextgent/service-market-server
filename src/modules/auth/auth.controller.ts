import { Request, Response } from "express";
import { otpService } from "./otp.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

export const sendOtpHandler = catchAsync(async (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(400).json({ success: false, message: "Phone is required" });
    return;
  }

  const result = await otpService.sendOTP({ phone });

  if (!result.success) {
    res.status(500).json({ success: false, message: result.message });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OTP sent successfully",
    data: result,
  });
});
