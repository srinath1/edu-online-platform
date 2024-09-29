"use client";
import { ICourse } from "@/interfaces";
import { Button, message } from "antd";
import { PlayCircle } from "lucide-react";
import React from "react";
import WatchPromoModal from "./WatchPromoModal";
import { createPaymentIntent } from "@/server-actions/payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PurchaseCourse = ({ course }: { course: ICourse }) => {
  const [showWatchPromo, setShowWatchPromo] = React.useState(false);
  const [paymentResponse, setPaymentResponse] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState(false);
  const paymentIntentHandler = async () => {
    try {
      setLoading(true);
      const response = await createPaymentIntent(Number(course?.price));
      if (response.success) {
        console.log(response.data);
        setPaymentResponse(response.data);
        setShowCheckoutForm(true);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const options = {
    // passing the client secret obtained from the server
    clientSecret: paymentResponse?.client_secret || "",
  };
  return (
    <div className="border rounded-sm border-primary">
      <img
        src={course.coverImage}
        alt="course cover"
        className="w-full h-60 object-fit"
      />
      <div className="mt-5 p-5 grid grid-cols-2 bg-gray-100">
        <Button
          icon={<PlayCircle size={16} />}
          onClick={() => setShowWatchPromo(true)}
        >
          Watch Promo
        </Button>
        <Button type="primary" onClick={paymentIntentHandler} loading={loading}>
          Buy Now ${course.price}
        </Button>
        <p className="col-span-2">
          Once you buy,you are eligible for lifetime access with 30 days refund
          guarantee.T&C apply.You will also get Course Completeion Certificate
          with lifetime updates
        </p>
      </div>
      {showWatchPromo && (
        <WatchPromoModal
          course={course}
          setShowWatchPromo={setShowWatchPromo}
          showWatchPromo={showWatchPromo}
        />
      )}
      {showCheckoutForm && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            course={course}
          />
        </Elements>
      )}
    </div>
  );
};

export default PurchaseCourse;
