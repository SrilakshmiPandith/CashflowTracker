import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { inputActions } from "../store/input-slice";

export default function Edit(){
    const stateData = useSelector((state) => state.inp);
    
    const isSelected = stateData.isSelected;
//     const selectedEntry = stateData.entries.filter((entry) => {return
//         entry.id === stateData.selectedId;
// })
   const selectedEntry = stateData.entries.filter((entry) => {return(entry.id===stateData.selectedId)});
   
    let date = useRef();
    let time = useRef();
    let amount = useRef();
    let comments = useRef();
    let category = useRef();

    
    
    let optionsClasses = "text-xl text-blue-500";
  let spanClasses =
    "text-2xl text-blue-500 text-opacity-80 absolute left-0 top-3 mx-6 px-3 transition duration-200 input-text";
  let cssClasses =
    "h-15  m-3 px-2 py-2 block text-2xl bg-white border-2 rounded-lg border-blue border-opacity-50 outline-none focus:border-blue-500 transition duration-200";
//   if (type === "CashOut") {
//     cssClasses += " text-red-700";
//   } else {
//     cssClasses += " text-green-700";
//   }
  let classes =
    "px-2 text-xl text-blue-500 border-2 rounded-lg border-blue border-opacity-50 outline-none focus:border-blue-500 focus:text-blue-500 transition duration-200";
  let numberClasses =
    cssClasses +
    " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

    return(
       <div className="border-2 rounded-md m-1 p-2 min-h-[430px] max-h-[430px]">
        <h1 className="text-2xl font-bold text-blue-500 text-center">Edit Entry</h1>
        {isSelected ? (<form className="px-3 py-5 m-auto  border-2 grid-rows-1 block ">
        <div className="flex gap-10 justify-center">
          <input type="date" ref={date} className={classes} defaultValue={selectedEntry[0].date} />
          <input type="time" ref={time} className={classes} />
          <input type="radio" name="type" />
          <label className="p-2 m-2 text-l font-bold rounded-lg bg-green-700 text-white">Cash In +</label>
          <input type="radio" name="type" />
          <label className="p-2 m-2 text-l font-bold rounded-lg bg-red-700 text-white">Cash Out -</label>
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
            <option value="Income" className={optionsClasses}>
              Income
            </option>
            <option value="SI" className={optionsClasses}>
              Savings and Investment
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
            Delete
          </button>
          <button
            type="button"
            className="p-2 m-3 text-xl font-bold rounded-lg bg-blue-700 text-white hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>) : <p>Please select an entry to edit/delete</p>}
       </div>
    );
}