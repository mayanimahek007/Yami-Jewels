import React from 'react';

const ReturnExchangeCancellationPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Return, Exchange, and Cancellation Policy</h1>
      <p className="mb-6">
        At Yaami Jewels, we value your satisfaction and take utmost care to ensure every product is crafted and delivered with precision. However, due to the nature of our handcrafted jewelry and made-to-order pieces, our return, exchange, and cancellation policies are strict and governed by the terms below:
      </p>

      <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
      <p className="mb-4">
        Returns are accepted only in cases where the error is from our side, such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>You received the wrong item</li>
        <li>There is a manufacturing defect</li>
        <li>The product differs significantly from the confirmed order</li>
      </ul>
      <p className="mb-4">
        Return requests must be initiated within [X days] of receiving the product (you can specify 3, 5, or 7 days).
      </p>
      <p className="mb-4">
        The item must be in unused, unworn, and original condition, along with all original packaging, certificates (if applicable), and tags.
      </p>
      <p className="mb-4">
        Returns will not be accepted for reasons such as change of mind, incorrect sizing ordered by the customer, or personal preferences once the product is delivered.
      </p>
      <p className="mb-4">
        Return shipping will be covered by Yaami Jewels only if the return is due to our error (e.g., wrong item shipped, manufacturing defect, etc.).
      </p>

      <h2 className="text-2xl font-semibold mb-4">Exchange Policy</h2>
      <p className="mb-4">
        Exchanges are available under the following terms:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>If the exchange is due to a mistake on our part (e.g., incorrect item, design mismatch, or quality issue), the exchange will be processed free of charge, including shipping.</li>
        <li>If the customer requests an exchange for any other reason (e.g., change in design, size, color preference), a minimal service fee will apply. This fee covers inspection, repackaging, and reprocessing costs. Shipping fees may also apply.</li>
        <li>All exchange requests must be submitted within [X days] of delivery.</li>
        <li>Items must be returned in original, unused condition, with all accessories and certificates included.</li>
        <li>Note: Custom or personalized items are not eligible for exchange unless an error was made by Yaami Jewels.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
      <p className="mb-4">
        Order cancellations are subject to the following terms:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Orders may be cancelled within 24 hours of placement without penalty.</li>
        <li>After 24 hours, cancellations will no longer be accepted as the order enters processing and production.</li>
        <li>If a cancellation is requested after the 24-hour window, and approved at our discretion, a 30% restocking fee will be deducted from the total refund amount.</li>
        <li>No cancellations will be entertained for customized or made-to-order items after the 24-hour period.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
      <p className="mb-4">
        Yaami Jewels reserves the right to inspect returned items before approving a refund or exchange.
      </p>
      <p className="mb-4">
        We reserve the right to refuse any return or exchange that does not comply with our policy.
      </p>
    </div>
  );
};

export default ReturnExchangeCancellationPolicy;
