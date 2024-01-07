import React from "react";

export default function ErrorMessage({ message = "Error" }) {
  return <p className="error">{message}</p>;
}
