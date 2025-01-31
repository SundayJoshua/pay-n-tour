import React, { useState, useEffect } from "react";
import { Container } from '@mui/material';


function Checkout() {
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);  // Initialize totalPrice state

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
                      value: parseFloat(totalPrice).toFixed(2), // Use dynamic totalPrice here
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
  }, [totalPrice]);  // Add totalPrice as dependency to re-run the effect if totalPrice changes

  // Fetch stored checkout data when the component is mounted
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart/checkout');
        if (!response.ok) {
          throw new Error('Failed to fetch checkout data');
        }
        const data = await response.json();
        setCheckoutData(data); // Store the fetched data
        
        // Set the totalPrice dynamically from the checkoutData
        if (Object.keys(data).length > 0) {
          const firstSessionId = Object.keys(data)[0]; // Get first sessionId
          setTotalPrice(data[firstSessionId].totalPrice);  // Set totalPrice dynamically
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, []);

  return (
    <Container maxWidth="sm">
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
            {/* Display checkout data if available */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {checkoutData && Object.keys(checkoutData).length === 0 && (
              <p>No checkout data found.</p>
            )}
            {checkoutData && Object.keys(checkoutData).length > 0 && (
              <ul>
                {Object.entries(checkoutData).map(([sessionId, { totalPrice }]) => (
                  <li key={sessionId}>
                    <strong>Session ID:</strong> {sessionId} <br />
                    <strong>Total Price:</strong> ${totalPrice}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Checkout;
