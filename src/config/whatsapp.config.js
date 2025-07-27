/**
 * WhatsApp configuration for order processing
 */

const whatsappConfig = {
  // WhatsApp business number (format: country code + number without +)
  // Example: For +91 98765 43210, use "919876543210"
  businessNumber: "919099975424",
  
  // Store information
  storeName: "Yami Jewels",
  storeAddress: "123 Jewelry Lane, Diamond District",
  
  // Order message template
  // You can customize this template as needed
  // Available variables: productName, productPrice, quantity, category, imageUrl, salePrice, regularPrice, productUrl
  orderMessageTemplate: `Hello! I would like to order from *{storeName}*:\n\n*{productName}*\nPrice: {productPrice}\nSale Price: {salePrice}\nRegular Price: {regularPrice}\nQuantity: {quantity}\nCategory: {category}\nImage: {imageUrl}\nProduct Link: {productUrl}\n\nPlease confirm availability and delivery details.\n\nThank you!`,
  
  // Chat message template
  // Available variables: storeName
  chatMessageTemplate: `Hello! I'm interested in your jewelry collection at *{storeName}*. Can you provide more information?

Thank you!`,
  
  // Format the order message with product details
  formatOrderMessage: function(product, quantity) {
    const productUrl = product._id ? `http://localhost:3000/product/${product._id}` : (product.url || '-');
    return this.orderMessageTemplate
      .replace('{storeName}', this.storeName)
      .replace('{productName}', product.name)
      .replace('{productPrice}', product.price || product.regularPrice || '')
      .replace('{salePrice}', product.salePrice ? `₹${product.salePrice}` : '-')
      .replace('{regularPrice}', product.regularPrice ? `₹${product.regularPrice}` : '-')
      .replace('{quantity}', quantity)
      .replace('{category}', product.category || 'Jewelry')
      .replace('{imageUrl}', product.image ? (product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`) : '-')
      .replace('{productUrl}', productUrl);
  },
  
  // Format the chat message
  formatChatMessage: function() {
    return this.chatMessageTemplate
      .replace('{storeName}', this.storeName);
  },
  
  // Generate WhatsApp URL for orders
  generateOrderUrl: function(product, quantity) {
    const message = this.formatOrderMessage(product, quantity);
    return `https://wa.me/${this.businessNumber}?text=${encodeURIComponent(message)}`;
  },
  
  // Generate WhatsApp URL for general chat
  generateChatUrl: function() {
    const message = this.formatChatMessage();
    return `https://wa.me/${this.businessNumber}?text=${encodeURIComponent(message)}`;
  }
};

export default whatsappConfig;