import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/ziina", async (req, res) => {
  const { amount, reference } = req.body;

  try {
    const response = await axios.post(
      "https://api.ziina.com/v1/payment_intents",
      {
        amount,
        currency: "AED",
        reference,
        return_url: `${process.env.FRONTEND_URL}/payment-success?order=${reference}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    res.json({
      success: true,
      paymentUrl: response.data.payment_url,
    });
  } catch (error: any) {
    console.error("ZIINA ERROR:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
});

export const PaymentRoutes = router;
