import React from "react";

export default function NumResult({ noOfResults }) {
  return (
    <p className="num-results">
      Found <strong>{noOfResults}</strong> results
    </p>
  );
}
