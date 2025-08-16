import React from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppOrderModal = ({ isOpen, onClose, diamond, product, quantity, onConfirm }) => {
  if (!isOpen) return null;

  const getProductImage = () => {
    const p = product || diamond;
    if (!p) return '/placeholder.png'; // fallback

    if (p.image) {
      return p.image.startsWith('http')
        ? p.image
        : `http://194.238.18.43:5000${p.image}`;
    }

    if (p.images && p.images.length > 0) {
      const imgObj = p.images[0];
      return typeof imgObj === 'string'
        ? `http://194.238.18.43:5000${imgObj}`
        : imgObj.url
          ? `http://194.238.18.43:5000${imgObj.url}`
          : '/placeholder.png';
    }

    if (p.img) return p.img;

    return '/placeholder.png';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white mb-3">
            <FaWhatsapp size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Order via WhatsApp</h3>
        </div>

        <div className="mb-6">
          <div className="flex items-start mb-4">
            <div className="border-2 border-[#b47b48] rounded-md mr-4">
              {product && (
                <img
                  src={getProductImage()}
                   alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{product.name}</h4>
              {product.salePrice && product.salePrice < product.regularPrice ? (
                <div>
                  <span className="text-[#48182E] font-semibold">₹{product.salePrice}</span>
                  <span className="ml-2 text-gray-500 line-through">₹{product.regularPrice}</span>
                </div>
              ) : (
                <span className="text-gray-800 font-semibold">₹{product.regularPrice || product.price}</span>
              )}
              <p className="text-gray-500 text-sm mt-1">Quantity: {quantity}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-md p-3 text-sm">
            <p className="text-gray-700 mb-2">Your order details will be sent to our WhatsApp business account. Our team will contact you shortly to confirm your order.</p>
            <p className="text-gray-700">You can discuss payment options, delivery details, and any customization requirements directly via WhatsApp.</p>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-md font-medium flex items-center justify-center transition-colors"
          >
            <FaWhatsapp className="mr-2" size={20} />
            Proceed to WhatsApp
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppOrderModal;