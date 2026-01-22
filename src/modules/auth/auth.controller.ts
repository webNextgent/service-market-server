import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { otpService } from "./otp.service";
import { AuthService } from "./auth.service";

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

export const reSendOtpHandler = catchAsync(
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

    const result = await otpService.reSendOTP({ phone });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP resend successfully",
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



// const createUser = catchAsync(async (req: Request, res: Response) => {
//   const user = await AuthService.createUser(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: "User created successfully",
//     data: user,
//   });
// });

// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const { safeUser, token } = await AuthService.loginUser(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Login successful",
//     data: [safeUser, token],
//   });
// });

// const socialLogin = catchAsync(async (req: Request, res: Response) => {
//   const { safeUser, token } = await AuthService.loginUser(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Login successful",
//     data: [safeUser, token],
//   });
// });

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await AuthService.updateProfile(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update profile successful",
    data: result,
  });
});

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await AuthService.deleteAccount(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account Deleted successful",
    data: result,
  });
});

const changeRole = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params?.id as string;
  const result = await AuthService.changeRole(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Role change successful",
    data: result,
  });
});

const AllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.AllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AllUsers get successful",
    data: result,
  });
});

export const AuthController = {
changeRole,
AllUsers,
updateProfile,
deleteAccount
};
