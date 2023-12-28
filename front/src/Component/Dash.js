import React, { useEffect, useState } from "react";

import GroceryCard from "./Grocery.js";
import { AiOutlineClose } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { grocerydata, getgrocerydata } from "../Reducers/grocery.js";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Dash = () => {
  const [addFoodInput, setAddFoodInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [groceries, setGroceries] = useState({});
  const [formData, setFormData] = useState({
    groceryName: "",
    groceryDescription: "",
    quantity: 0,
    unit: 0,
    expiryDate: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name==='unit'||name === 'quantity') && parseFloat(value) < 0) {
      e.target.style.borderColor = 'red';
      return;
    }
  
    e.target.style.borderColor = ''; 
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getgrocerydata());
  }, []);

  const { allgrocery, successallgrocery, creategrocery, currentgrocery ,groceryerror} =
    useSelector((state) => state.grocery);
   



  useEffect(() => {
    if (creategrocery) dispatch(getgrocerydata());
    else if(!creategrocery&&groceryerror!=='')
    toast.error(groceryerror);
  }, [creategrocery,groceryerror]);

  useEffect(() => {
    if (successallgrocery) {
      setGroceries(allgrocery);
    }
  }, [successallgrocery, allgrocery]);

  const handleSubmit = () => {
    setAddFoodInput(false);
    dispatch(grocerydata(formData));
    setFormData({
      groceryName: "",
      groceryDescription: "",
      quantity: 0,
      unit: 0,
      expiryDate: "",
      image: null,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        // Update the formData with the image data
        setFormData({
          ...formData,
          image: reader.result,
        });
      }
    };
  };

  const filteredGroceries = Array.isArray(groceries)
    ? groceries.filter((grocery) => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        const groceryNameMatch =
          grocery.name && grocery.name.toLowerCase().includes(lowerCaseQuery);

        return groceryNameMatch;
      })
    : [];

  const AddFood = () => {
    setAddFoodInput(true);
  };

  const handleCloseAddFood = () => {
    setAddFoodInput(false);
  };

  return (
    <>
      <div
        className={`flex p-4 bg-gray-900  flex-col h-screen w-screen items-center ${
          addFoodInput && "bg-gray-500"
        }`}
      >
        <div className="flex w-full items-center justify-center mb-4 lg:mb-0">
          <input
            type="text"
            placeholder="Search...(Grocery Name)"
            className="py-2 px-3 w-1/2 focus:outline-none border-gray-300 rounded border ml-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <span className="text-5xl  text-center lg:text-left font-serif text-gray-200 w-full block pt-6 pb-4 mx-auto">
          Grocery
        </span>

        <hr className="w-screen border-t border-gray-500 lg:mt-0" />
        <h4 className="text-gray-400 text-center w-full lg:text-right pt-2 lg:pb-2 pr-4">
          Add Your grocery{" "}
          <button
            className="bg-orange-500 text-gray-700 hover:bg-orange-400 py-1 px-4 rounded cursor-pointer"
            onClick={() => AddFood()}
          >
            Add
          </button>
        </h4>
        <hr className="w-screen border-t border-gray-500 mt-2 lg:mt-0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-6">
          {searchQuery ? (
            filteredGroceries.length > 0 ? (
              filteredGroceries.map((grocery) => (
                <div key={grocery._id}>
                  <GroceryCard
                    id={grocery._id}
                    dull={addFoodInput}
                    quantity={grocery.quantityAvailable}
                    groceryDescription={grocery.description}
                    groceryName={grocery.name}
                    groceryPhoto={grocery.groceryPhoto}
                    expiryDate={grocery.expiryDate}
                    price={grocery.pricePerUnit}
                  />
                </div>
              ))
            ) : (
              <p className="text-white w-full text-3xl">
                No matching grocery found
              </p>
            )
          ) : // If searchQuery is empty, use all grocerys
          groceries && Array.isArray(groceries) && groceries.length > 0 ? (
            groceries.map((grocery) => (
              <div key={grocery._id}>
                <GroceryCard
                  id={grocery._id}
                  dull={addFoodInput}
                  quantity={grocery.quantityAvailable}
                  groceryDescription={grocery.description}
                  groceryName={grocery.name}
                  groceryPhoto={grocery.groceryPhoto}
                  expiryDate={grocery.expiryDate}
                  price={grocery.pricePerUnit}
                />
              </div>
            ))
          ) : (
            <p className="text-white w-full text-3xl">No grocerys available</p>
          )}
        </div>
      </div>

      {addFoodInput && (
        <div className="bg-gray-700 fixed overflow-y-auto max-h-screen mb-8 w-3/4 lg:w-1/2 xl:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 box-sizing-border rounded-xl">
          <button
            className="absolute top-0 right-0 m-4 p-2 text-gray-400 hover:text-gray-200 cursor-pointer"
            onClick={handleCloseAddFood}
          >
            <AiOutlineClose />
          </button>
          <div className="flex flex-col justify-center items-center gap-5 mt-10 w-full">
            <div className="flex w-full gap-4 justify-between items-center">
              <label
                htmlFor="groceryName"
                className="block font-medium text-gray-300 text-sm  lg:text-lg xl:text-lg mb-2 w-1/4"
              >
                Grocery Name
              </label>
              <input
                type="text"
                id="groceryName"
                name="groceryName"
                className="w-3/4 p-2 border outline-none rounded"
                placeholder="Enter Grocery name"
                value={formData.groceryName}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex w-full gap-4 justify-between items-center">
              <label
                htmlFor="groceryDescription"
                className="block font-medium text-gray-300 text-sm  lg:text-lg xl:text-lg mb-2 w-1/4"
              >
                Description
              </label>
              <textarea
                id="groceryDescription"
                name="groceryDescription"
                className="w-3/4 p-2 border outline-none rounded"
                placeholder="Enter description"
                value={formData.groceryDescription}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex w-full gap-4 justify-between items-center">
              <label
                htmlFor="groceryphoto"
                className="block font-medium text-gray-300 text-sm  lg:text-lg xl:text-lg mb-2 w-1/4"
              >
                Photo (Optional)
              </label>
              <input
                type="file"
                id="groceryphoto"
                accept="image/*"
                className="cursor-pointer w-3/4 p-2 outline-none rounded"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex w-full gap-4">
              <label
                htmlFor="quantity"
                className="block font-medium text-gray-300 text-sm  lg:text-lg xl:text-lg mb-2 w-1/4"
              >
                Quantity
              </label>
              <input
        type="number"
        min="0"
        pattern="[0-9]*"
        id="quantity"
        name="quantity"
        className="border rounded-md outline-none p-2 w-3/4"
        value={formData.quantity}
        onChange={handleInputChange}
      />
            </div>

            <div className="flex w-full gap-4">
              <label
                htmlFor="unit"
                className="block font-medium text-gray-300 text-sm  lg:text-lg xl:text-lg mb-2 w-1/4"
              >
                Price per unit
              </label>
              <input
                type="number"
                min="0"
                pattern="[0-9]*"
                id="unit"
                name="unit"
                className="border rounded-md outline-none p-2 w-3/4"
                value={formData.unit}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex w-full gap-4">
              <label
                htmlFor="expiryDate"
                className="block font-medium text-gray-300 text-sm  lg:text-lg xl:text-lg mb-2 w-1/4"
              >
                Expiry date (Optional)
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                className="border rounded-md outline-none p-2 w-3/4"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="bg-green-500 text-gray-800 border border-green-600 py-2 px-4 rounded cursor-pointer hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Dash;
