const button = document.querySelector("button");

button.addEventListener("click", async () => {
  try {
    // Validate items array
    const items = [
      { id: 1, quantity: 3 },
      { id: 2, quantity: 1 },
    ];

    if (!Array.isArray(items) || items.length === 0) {
      console.error("Invalid items array");
      // Display a user-friendly error message on the UI
      return;
    }

    const response = await fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
      }),
    });

    if (!response.ok) {
      // Handle non-OK responses
      const errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }

    const { url } = await response.json();

    // Redirect to the checkout page
    window.location.href = url;
  } catch (error) {
    console.error("An error occurred:", error.message);
    // Display a user-friendly error message on the UI
  }
});
