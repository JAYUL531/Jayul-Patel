class Payment {
    constructor() {
        this.bindEvents();
        this.currentMethod = 'credit';
    }

    bindEvents() {
        // Payment method selection
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', (e) => this.handlePaymentMethodChange(e));
        });

        // Credit card number formatting
        document.getElementById('cardNumber').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
            this.updateCardType(value);
        });

        // Expiry date formatting
        document.getElementById('expiryDate').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });

        // CVV validation
        document.getElementById('cvv').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        // Form submission
        document.getElementById('confirmPaymentBtn').addEventListener('click', () => this.handlePayment());

        // Switch to payment from cart
        document.getElementById('proceedToPaymentBtn').addEventListener('click', () => this.showPaymentModal());
    }

    handlePaymentMethodChange(e) {
        this.currentMethod = e.target.value;
        
        // Hide all forms
        document.querySelectorAll('.payment-form').forEach(form => {
            form.style.display = 'none';
        });

        // Show selected form
        const selectedForm = document.getElementById(`${this.currentMethod}Form`);
        if (selectedForm) {
            selectedForm.style.display = 'block';
        }
    }

    updateCardType(number) {
        const cardTypeIcon = document.querySelector('.card-type-icon i');
        // Simple card type detection based on first digit
        const firstDigit = number.charAt(0);
        
        if (firstDigit === '4') {
            cardTypeIcon.className = 'fab fa-cc-visa';
        } else if (firstDigit === '5') {
            cardTypeIcon.className = 'fab fa-cc-mastercard';
        } else if (firstDigit === '3') {
            cardTypeIcon.className = 'fab fa-cc-amex';
        } else {
            cardTypeIcon.className = 'fas fa-credit-card';
        }
    }

    showPaymentModal() {
        // Hide cart modal
        document.getElementById('cartModal').classList.remove('active');
        
        // Update order summary
        this.updateOrderSummary();
        
        // Show payment modal
        document.getElementById('paymentModal').classList.add('active');
    }

    updateOrderSummary() {
        const subtotal = cart.getTotal();
        const shipping = 5.99;
        const tax = subtotal * 0.1; // 10% tax

        document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('summaryShipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('summaryTax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('summaryTotal').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    }

    validateCreditCard() {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardHolder = document.getElementById('cardHolder').value;

        if (cardNumber.length < 16) {
            alert('Please enter a valid card number');
            return false;
        }

        if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return false;
        }

        if (cvv.length < 3) {
            alert('Please enter a valid CVV');
            return false;
        }

        if (cardHolder.trim().length < 3) {
            alert('Please enter the card holder name');
            return false;
        }

        return true;
    }

    async handlePayment() {
        if (!isLoggedIn()) {
            alert('Please login to complete your purchase');
            document.getElementById('paymentModal').classList.remove('active');
            document.getElementById('loginModal').classList.add('active');
            return;
        }

        switch (this.currentMethod) {
            case 'credit':
                if (!this.validateCreditCard()) {
                    return;
                }
                break;
            case 'paypal':
                // Redirect to PayPal
                alert('Redirecting to PayPal...');
                return;
            case 'apple':
                // Handle Apple Pay
                alert('Processing Apple Pay...');
                return;
        }

        // Simulate payment processing
        const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
        confirmPaymentBtn.disabled = true;
        confirmPaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear cart
            cart.items = [];
            cart.saveCart();
            cart.updateCartCount();

            // Show success message
            alert('Payment successful! Thank you for your purchase.');
            
            // Close modal and reset form
            document.getElementById('paymentModal').classList.remove('active');
            document.getElementById('creditCardForm').reset();
        } catch (error) {
            alert('Payment failed. Please try again.');
        } finally {
            confirmPaymentBtn.disabled = false;
            confirmPaymentBtn.innerHTML = '<i class="fas fa-lock"></i> Pay Now';
        }
    }
}

// Initialize payment
const payment = new Payment(); 