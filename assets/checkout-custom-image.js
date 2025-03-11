/**
 * Checkout Custom Image Handler
 * 
 * This script handles the custom image data during the checkout process
 * by attaching it to the checkout attributes.
 */

(function() {
  // Wait for the Shopify checkout
  document.addEventListener('DOMContentLoaded', function() {
    // Only run on checkout pages
    if (window.Shopify && window.Shopify.Checkout) {
      // Check if we're on the contact information page
      if (Shopify.Checkout.step === 'contact_information' || Shopify.Checkout.step === 'shipping_method') {
        const customProductImage = localStorage.getItem('customProductImage');
        
        if (customProductImage) {
          console.log('Found custom product image, attaching to checkout');
          
          // Add a hidden input field to the form
          const checkoutForm = document.querySelector('form.step');
          
          if (checkoutForm) {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'checkout[attributes][custom_image]';
            hiddenInput.value = customProductImage;
            checkoutForm.appendChild(hiddenInput);
            
            // Add a note about the custom image
            const noteField = document.querySelector('textarea[name="checkout[note]"]');
            
            if (noteField) {
              let noteText = noteField.value || '';
              
              if (!noteText.includes('This order contains customized images')) {
                noteText += noteText ? '\n\n' : '';
                noteText += 'This order contains customized images. Please check the order attributes for the image data.';
                noteField.value = noteText;
              }
            }
            
            // Add a visual confirmation for the customer
            const cartSection = document.querySelector('.section--shipping-address') || 
                               document.querySelector('.section--shipping-method') ||
                               document.querySelector('.main__content');
            
            if (cartSection) {
              const customizationIndicator = document.createElement('div');
              customizationIndicator.className = 'custom-image-confirmation';
              customizationIndicator.innerHTML = `
                <div style="margin: 20px 0; padding: 10px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #f8fff8;">
                  <p style="color: #4CAF50; font-weight: bold;">✓ Your custom image has been attached to this order</p>
                </div>
              `;
              
              cartSection.prepend(customizationIndicator);
            }
          }
        }
      }
      
      // If we reach the thank you page, clear the stored image
      if (Shopify.Checkout.step === 'thank_you') {
        localStorage.removeItem('customProductImage');
        console.log('Order complete, cleared custom image data');
      }
    }
  });
})();