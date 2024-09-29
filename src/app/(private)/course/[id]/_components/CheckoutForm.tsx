import { ICourse } from "@/interfaces";
import { Button, Modal, message } from "antd";
import React from "react";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/user-store";
import { saveEnrollment } from "@/server-actions/enrollments";
import { useRouter } from "next/navigation";

const CheckoutForm = ({
  showCheckoutForm,
  setShowCheckoutForm,
  course,
}: {
  showCheckoutForm: boolean;
  setShowCheckoutForm: (showCheckoutForm: boolean) => void;
  course: ICourse;
}) => {
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { currentUserData } = usersGlobalStore() as IUsersGlobalStore;
  const router = useRouter();

  //handle submit

  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/user/enrolled-courses",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment Successfull");
        const response = await saveEnrollment({
          course: course._id,
          student: currentUserData?._id!,
          paymentId: result.paymentIntent.id,
          amount: course.price,
        });
        if (!response.success) {
          message.error(response.message);
          return;
        }
        message.success("You have successfully enrolled in the course");
        setShowCheckoutForm(false);
        router.push("/user/enrolled-courses");
      }
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title={`Buy ${course.title}`}
      centered
      footer={null}
      open={showCheckoutForm}
      onCancel={() => setShowCheckoutForm(false)}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{ allowedCountries: ["us"], mode: "shipping" }}
        />
        <div className="flex justify-end gap-5 mt-5">
          <Button disabled={loading}>cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay ${course.price}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
