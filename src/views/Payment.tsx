import React, { useState, useEffect } from "react";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./payment.css";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51MXchGCLZZaEdOAQjng17YfEiWZsjEMH6AXq2PPX2A12EHVcw4a5ZpIwNHDVa6nhnIlaPrptHeaeR8ETDMcBQp3b004XuyYnYy"
);

export default function Payment() {
  const { state } = useLocation();


  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorBackground: "#1b1b1b",
      colorText: "#ffffff",
    },
  };
  const options: StripeElementsOptions = {
    clientSecret: state.clientSecret,
    appearance,
  };

  return (
    <div className="Payment">
      {state.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
