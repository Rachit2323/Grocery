import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const GroceryCard = ({
  dull,
  quantity,
  groceryDescription,
  groceryName,
  groceryPhoto,
  expiryDate,
  price,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const formattedExpiryDate = new Date(expiryDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  return (
    <div
      className={`bg-white w-full h-full  p-4 rounded-md shadow-md transition-transform transform-gpu hover:scale-105 cursor-pointer ${
        dull && "opacity-50"
      }`}
    >
      <div className="mb-4 flex justify-around flex-col h-full">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold  flex text-gray-700 m-0">
            Name: {groceryName}
          </h3>
        </div>
        <div>
          <img
            src={groceryPhoto.secure_url}
            alt="Grocery Photo"
            className="w-full pt-2 h-auto rounded-md shadow-md transition-transform transform-gpu hover:scale-105"
          />
        </div>

        <div className="flex  flex-col justify-between mt-2">
          <p className="text-gray-900">
            Description:{" "}
            <span className="text-gray-500">{groceryDescription}</span>
          </p>
          <p className="text-gray-900">
            Quantity:<span className="text-gray-500">{quantity}</span> 
          </p>
          <p className="text-gray-900">
            Price per Unit: <span className="text-gray-500">{price}</span>
          </p>

          {expiryDate && (
            <p className="text-gray-900">
              Expiry:{" "}
              <span className="text-gray-500">{formattedExpiryDate} </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryCard;
