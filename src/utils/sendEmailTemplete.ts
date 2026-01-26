export const bookingConfirmationTemplate = (data: {
  customerName: string;
  serviceDate: string;
  serviceTime: string;
  serviceAddress: string;
  referenceId?: string;
  serviceType: string;
  serviceDetails: string;
  serviceCharges: number;
  vatAmount: number;
  totalAmount: number;
}) => {
  const subject = `Your booking request has been received`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Booking Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:#ffffff; padding:25px 30px; border-bottom:1px solid #e0e0e0;">
              <h1 style="margin:0; color:#333333; font-size:24px; font-weight:bold;">
                Service Market
              </h1>
              <p style="margin:10px 0 0; color:#666666; font-size:16px;">
                Your booking request has been received
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:25px 30px 15px 30px;">
              <p style="margin:0; color:#333333; font-size:16px; line-height:1.5;">
                Hi <strong>${data.customerName}</strong>,
              </p>
              <p style="margin:15px 0 0; color:#666666; font-size:16px; line-height:1.5;">
                Thank you for making a <strong>${data.serviceType}</strong> booking with ServiceMarket! You will receive another email shortly confirming your booking.
              </p>
              <p style="margin:15px 0 0; color:#666666; font-size:16px; line-height:1.5;">
                In the meantime, please go over your booking details and let us know if you would like to make any changes by replying to this email.
              </p>
            </td>
          </tr>

          <!-- Booking Details Section -->
          <tr>
            <td style="padding:0 30px 20px 30px;">
              <h2 style="margin:0 0 15px 0; color:#333333; font-size:20px; font-weight:bold;">
                Booking details
              </h2>
              
              <!-- Service Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:8px 0;">
                    <strong style="color:#333333; font-size:15px;">Service</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0; color:#666666; font-size:15px;">
                    ${data.serviceType}<br/>
                    ${data.serviceDetails}
                  </td>
                </tr>
              </table>

              <!-- When & Where -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:8px 0;">
                    <strong style="color:#333333; font-size:15px;">When</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0; color:#666666; font-size:15px;">
                    ${data.serviceDate} at ${data.serviceTime}
                  </td>
                </tr>
                
                <tr>
                  <td style="padding:16px 0 8px 0;">
                    <strong style="color:#333333; font-size:15px;">Where</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0; color:#666666; font-size:15px;">
                    ${data.serviceAddress}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Payment Details Section -->
          <tr>
            <td style="padding:20px 30px; background:#f9f9f9; border-top:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0;">
              <h2 style="margin:0 0 15px 0; color:#333333; font-size:20px; font-weight:bold;">
                Payment details
              </h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
                <!-- Service Charges -->
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#333333;">Service Charges</span>
                  </td>
                  <td align="right" style="padding:8px 0;">
                    <span style="color:#333333; font-weight:bold;">AED ${data.serviceCharges.toFixed(2)}</span>
                  </td>
                </tr>
                
                <!-- VAT -->
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#333333;">VAT</span>
                  </td>
                  <td align="right" style="padding:8px 0;">
                    <span style="color:#333333;">AED ${data.vatAmount.toFixed(2)}</span>
                  </td>
                </tr>
                
                <!-- Total -->
                <tr>
                  <td style="padding:16px 0 8px 0; border-top:1px solid #e0e0e0;">
                    <strong style="color:#333333; font-size:16px;">Total</strong>
                  </td>
                  <td align="right" style="padding:16px 0 8px 0; border-top:1px solid #e0e0e0;">
                    <strong style="color:#333333; font-size:16px;">AED ${data.totalAmount.toFixed(2)}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Payment Instructions -->
          <tr>
            <td style="padding:25px 30px;">
              <div style="background:#fff8e1; border-left:4px solid #ffb300; padding:15px; border-radius:4px;">
                <p style="margin:0; color:#333333; font-size:15px; line-height:1.5;">
                  <strong>Please pay the service professional in cash after the service is delivered.</strong>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f5f5f5; padding:20px 30px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#666666;">
                Thank you for choosing ServiceMarket
              </p>
              <p style="margin:8px 0 0; font-size:11px; color:#999999;">
                If you have any questions, please reply to this email or contact our support team.
              </p>
              <p style="margin:8px 0 0; font-size:11px; color:#999999;">
                © ${new Date().getFullYear()} ServiceMarket. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return { subject, html };
};