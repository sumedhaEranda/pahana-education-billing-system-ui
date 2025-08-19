// Using env var directly for base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8085/api';

class PaymentApiService {
  // Create a new bill/order
  static async createBill(billData) {
    try {
      console.log('PaymentApiService.createBill - Starting bill creation with data:', billData);
      
      const token = sessionStorage.getItem('jwtToken'); // Replace 'token' with your actual key if different
      console.log('PaymentApiService.createBill - JWT Token:', token ? 'Token exists' : 'No token found');
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // add bearer token here
      };
      console.log('PaymentApiService.createBill - Request headers:', headers);
      
      console.log('PaymentApiService.createBill - Making API call to:', `${API_BASE_URL}/bills`);
      const response = await fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(billData)
      });
  
      console.log('PaymentApiService.createBill - Response status:', response.status);
      console.log('PaymentApiService.createBill - Response ok:', response.ok);
      
      if (!response.ok) {
        console.error('PaymentApiService.createBill - HTTP error response:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('PaymentApiService.createBill - Success response:', result);
      return result;
    } catch (error) {
      console.error('PaymentApiService.createBill - Error creating bill:', error);
      throw error;
    }
  }

  // Generate bill data from cart and shipping data
  static generateBillData(cart, shippingData, paymentMethod, selectedItemIds = null) {
    // Generate a unique order ID (you can modify this logic as needed)
    const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Filter cart items based on selection
    let itemsToProcess = cart.line_items;
    if (selectedItemIds && selectedItemIds.length > 0) {
      // Only process selected items
      itemsToProcess = cart.line_items.filter(item => selectedItemIds.includes(item.id));
    }
    
    // Convert cart items to bill items format using actual cart structure
    const billItems = itemsToProcess.map(item => ({
      itemId: item.product_id, // Using product_id from cart item
      quantity: item.quantity,
      unitPrice: parseFloat(item.price.raw) // Using price.raw from cart item
    }));

    // Determine payment type based on selected method
    const paymentType = paymentMethod === 'cash' ? 'COD' : 'CARD';

    // Get account number from userId stored in localStorage
    const userId = localStorage.getItem('userId');
    const accountNo = userId ? Number(userId) : null;
    
    console.log('PaymentApiService.generateBillData - User ID from localStorage:', userId);
    console.log('PaymentApiService.generateBillData - Account number:', accountNo);
    
    if (!accountNo) {
      console.error('PaymentApiService.generateBillData - No account number found in localStorage');
      throw new Error('User account number not found. Please log in again.');
    }

    const billData = {
      email: shippingData.email,
      accountNo: accountNo, // Get from user ID instead of shipping data
      paymentType: paymentType,
      orderId: orderId,
      billItems: billItems
    };

    return billData;
  }

  // Get bill by ID
  static async getBill(billId) {
    try {
      const response = await fetch(`${API_BASE_URL}/bills/${billId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching bill:', error);
      throw error;
    }
  }

  // Get all bills
  static async getAllBills() {
    try {
      const response = await fetch(`${API_BASE_URL}/bills`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching bills:', error);
      throw error;
    }
  }

  // Update bill
  static async updateBill(billId, billData) {
    try {
      const response = await fetch(`${API_BASE_URL}/bills/${billId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(billData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating bill:', error);
      throw error;
    }
  }

  // Delete bill
  static async deleteBill(billId) {
    try {
      const response = await fetch(`${API_BASE_URL}/bills/${billId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting bill:', error);
      throw error;
    }
  }
}

export default PaymentApiService; 