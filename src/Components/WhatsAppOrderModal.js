import React from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppOrderModal = ({ isOpen, onClose, product, quantity, onConfirm }) => {
  if (!isOpen) return null;

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
            <div className="bg-[#b47b48] rounded-md p-1 mr-4">
              <img 
                src={product.images ? product.images[0] : product.img} 
                alt={product.name} 
                className="w-20 h-20 object-cover rounded"
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{product.name}</h4>
              <p className="text-gray-600">{product.price}</p>
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