const API_URL = "http://localhost:3000/api";

export const getOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    const data = await response.json();

    return data.orders;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (order) => {
  console.log(order);

  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("Order berhasil:", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusOrder = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/orders/status/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
      method: "PATCH",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("Order berhasil di selesaikan:", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
