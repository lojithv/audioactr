import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ clientSecret }: any) {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          Swal.fire({
            icon: "success",
            title: "Payment succeeded!",
            text: "",
          });
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          Swal.fire({
            icon: "error",
            title: "Your payment was not successful, please try again.",
            text: "",
          });
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          Swal.fire({
            icon: "error",
            title: "Something went wrong.",
            text: "",
          });
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/home",
      },
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else if(error) {
      setMessage("An unexpected error occurred.");
    } else {
      Swal.fire({
        icon: "success",
        title: "Payment succeeded!",
        text: "",
      }).then((v)=>{
        navigate("/home")
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e: any) => setEmail(e.target?.value)}
      />
      <PaymentElement id="payment-element" />
      <button className="payment-btn" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
