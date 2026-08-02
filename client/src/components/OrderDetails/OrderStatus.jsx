import React from "react";
import "./OrderStatus.css";

const steps = [
  "Order Placed",
  "Packed",
  "Out for Delivery",
  "Delivered",
];

export default function OrderStatus({ status }) {
  const currentStep = steps.indexOf(status);

  return (
    <div className="order-card">

      <h3>Order Status</h3>

      <div className="status-timeline">

        {steps.map((step, index) => {

          const completed = index <= currentStep;

          return (
            <div
              className="timeline-item"
              key={step}
            >

              <div className="timeline-left">

                <div
                  className={`timeline-circle ${
                    completed ? "completed" : ""
                  }`}
                >
                  {completed ? "✓" : ""}
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`timeline-line ${
                      completed ? "completed" : ""
                    }`}
                  />
                )}

              </div>

              <div className="timeline-content">

                <h4>{step}</h4>

                <p>
                  {completed
                    ? "Completed"
                    : "Pending"}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}