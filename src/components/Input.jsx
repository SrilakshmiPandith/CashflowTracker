import Modal from "./Modal";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputActions } from "../store/input-slice";

export default function Input() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.inp.balance);
  const modal = useRef();
  const errModal = useRef();
  let date = useRef();
  let time = useRef();
  let amount = useRef();
  let comments = useRef();
  let category = useRef();
  const [type, setType] = useState("");

  function handleCashIn() {
    setType("CashIn");
  }
  function handleCashOut() {
    setType("CashOut");
  }

  let optionsClasses = "text-xl text-blue-500";
  let spanClasses =
    "md:text-2xl text-m text-blue-500 text-opacity-80 absolute left-0 top-3 mx-6 px-3 transition duration-200 input-text";
  let cssClasses =
    "h-15  m-3 px-2 py-2 block md:text-2xl text-m bg-white border-2 rounded-lg border-blue border-opacity-50 outline-none focus:border-blue-500 transition duration-200";
  if (type === "CashOut") {
    cssClasses += " text-red-700";
  } else {
    cssClasses += " text-green-700";
  }
  let classes =
    "px-2 md:text-xl text-m text-blue-500 border-2 rounded-lg border-blue border-opacity-50 outline-none focus:border-blue-500 focus:text-blue-500 transition duration-200";
  let numberClasses =
    cssClasses +
    " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  let error=false;
  let content = (
    <p className="text-2xl font-bold text-blue-700 text-center">
      Please select CashIn or CashOut
    </p>
  );

  if (balance === 0 && type === "CashOut") {
    content = (
      <p className="text-2xl font-bold text-blue-700 text-center">
        Please Add Initial Amount by Clicking Cash In button
      </p>
    );
  } else if (type === "CashIn" || type === "CashOut") {
    content = (
      <form className="px-3 py-5 m-auto md:w-2/3 border-2 grid-rows-1 block ">
        <div className="flex gap-10 justify-center">
          <input type="date" ref={date} className={classes} />
          <input type="time" ref={time} className={classes} />
        </div>
        <label className="relative">
          <input type="number" ref={amount} className={numberClasses} />
          <span className={spanClasses}>Amount</span>
        </label>
        <label className="relative">
          <input type="text" ref={comments} className={cssClasses} />
          <span className={spanClasses}>Comments</span>
        </label>
        <label className="relative">
          <select name="category" className={cssClasses} ref={category}>
            <option value=""></option>
            <option value="Salary" className={optionsClasses}>
              Salary
            </option>
            <option value="Food" className={optionsClasses}>
              Food
            </option>
            <option value="Health" className={optionsClasses}>
              Health
            </option>
            <option value="Savings and Investments" className={optionsClasses}>
              Savings and Investments
            </option>
            <option value="Subscriptions" className={optionsClasses}>
              Subscription
            </option>
            <option value="Other" className={optionsClasses}>
              Other
            </option>
          </select>
          <span className={spanClasses}>Category</span>
        </label>
        <div className="flex gap-8 justify-center">
          <button
            type="reset"
            className="p-2 m-3 text-xl font-bold rounded-lg border-2 border-blue-500 bg-white text-blue-700 hover:bg-stone-200"
          >
            Clear
          </button>
          <button
            type="button"
            className="p-2 m-3 text-xl font-bold rounded-lg bg-blue-700 text-white hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    );
  }else if(type==="CashOut" && error){
    content = (<p>Please check</p>);
  }

  function handleSave() {
    let enteredDate = date.current.value;
    let enteredTime = time.current.value;
    let enteredAmount = amount.current.value;
    let enteredComments = comments.current.value;
    let enteredCategory = category.current.value;
    
    if (
      enteredDate.trim() === "" ||
      enteredTime.trim() === "" ||
      enteredAmount.trim() === "" ||
      enteredComments.trim() === "" ||
      enteredCategory.trim() === ""
    ) {
      modal.current.open();
      return;
    } else {
      let data = {
        date: enteredDate,
        time: enteredTime,
        amount: +enteredAmount,
        comments: enteredComments,
        category: enteredCategory,
      };
      let amount = +enteredAmount;
      if(type==="CashIn"){
      dispatch(inputActions.addCashIn(data));
      }else if(enteredAmount<=balance && type==="CashOut"){
        dispatch(inputActions.addCashOut(data));
      }else if(type==="CashOut" && amount>balance){
        errModal.current.open();
        return;
      }
    }
  }

  return (
    <>
      <Modal ref={modal} buttonCap="Close">
        <h2 className="text-xl font-bold text-blue-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Please check if you forgot to enter any value
        </p>
        <p className="text-stone-600 mb-4">
          Please provide valid value in every input field
        </p>
      </Modal>
      <Modal ref={errModal} buttonCap="Close">
        <h2 className="text-xl font-bold text-blue-700 my-4">Invalid Amount</h2>
        <p className="text-stone-600 mb-4">
          Please check if you entered Cash out Amount greater than balance amount
        </p>
        <p className="text-stone-600 mb-4">
          Please provide valid value in 'Amount' field
        </p>
      </Modal>
      <div className="border-2 rounded-md m-1 p-2 content-center min-h-[500px]">
        <div className="flex justify-center">
          <button
            className="p-2 m-2 text-xl font-bold rounded-lg bg-green-700 text-white hover:bg-green-600"
            onClick={handleCashIn}
          >
            Cash In +
          </button>
          <button
            className="p-2 m-2 text-xl font-bold rounded-lg bg-red-700 text-white hover:bg-red-600"
            onClick={handleCashOut}
          >
            Cash Out -
          </button>
        </div>
        {content}
      </div>
    </>
  );
}
