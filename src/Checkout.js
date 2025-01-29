import React, { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';



function Checkout() {
  const total = 2000;  // Set total dynamically (example)

  // Handle form submission (this can be updated as per your backend logic)
  const submitFormData = () => {
    console.log("Form data submitted");
    // Here you can add any logic like sending the form data to your backend
    // For now, we are just logging the data
  };

  // PayPal integration using useEffect to load PayPal script and initialize buttons
  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AbjrXdVokXwuEA3NLMD3OVRQ0z3b9-7HC4G9Df-vEqDydM-GJfCYhcYT7Pf0ERDhVi_bJqAM0FQNXgUj&currency=USD&disable-funding=credit";
      script.onload = () => {
        if (window.paypal) {
          window.paypal.Buttons({
            style: {
              color: "blue",
              shape: "rect",
            },
            createOrder: function (data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: parseFloat(total).toFixed(2),
                    },
                  },
                ],
              });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then(function () {
                alert("Transaction completed");
                submitFormData();  // Call the submitFormData function
              });
            },
          }).render("#paypal-button-container");
        }
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, [total]);  // Add total as dependency to re-run the effect if total changes

  return (
    
    <Container maxWidth ="sm">
      <div>
        <div className="col-lg-6">
          <div>
              <h1>Complete your checkout experience</h1>
          </div>

          <br />

          <div className="box-element" id="payment-info">
            <small>Paypal options</small>
            <div id="paypal-button-container"></div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="box-element">
            <hr />
            <h3>Order Summary</h3>
            
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Checkout;
