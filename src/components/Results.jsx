import { useDispatch, useSelector } from "react-redux";
import { inputActions } from "../store/input-slice";
import { useRef, useState } from "react";
import Button from "./Button";

export default function Results() {
  const [filter, setFilter] = useState('Clear Filter');
  const [subFilter, setSubFilter] = useState('Salary');
  const [search, setSearch] = useState('');
  const [commentSearch, setCommentSearch] = useState('');
  const data = useSelector((state) => state.inp);
  const entries = data.entries;
  function handleFilter(name){
    setFilter(name);
  }

  function handleSubFilter(name){
    setSubFilter(name);
  }
  
  function handleChange(e){
    setSearch(e.target.value);
  }

  function handleCommentSearch(e){
    setCommentSearch(e.target.value);
  }

  let ent = entries;
  if(commentSearch !== ''){
    ent = entries.filter((entry)=> {return commentSearch===''? entry: entry.comments.includes(commentSearch)})
  }
  if(filter === "Cash InFlow"){
   ent =  entries.filter((entry) => { return entry.type==="CashIn"});
  }
  else if(filter === "Cash OutFlow"){
    ent =  entries.filter((entry) => { return entry.type==="CashOut"});
   }else if (filter==="Category"){
    ent =  entries.filter((entry) => { return entry.category===subFilter});
   }else if(filter === "Amount"){
    ent = entries.filter((entry)=> {return search===''? entry: entry.amount.toString().includes(search)})
   }
   
  
  let cssClasses =
  "h-15  m-3 px-2 py-2 block text-l bg-white border-2 rounded-lg border-blue text-blue-700 border-opacity-50 outline-none focus:border-blue-500 transition duration-200";
  return (
    <div className="border-2 rounded-md p-2 m-1 overflow-auto max-h-[600px] ">
      <div className="border-2 p-2 rounded-3xl">
        <p className="text-3xl font-bold text-blue-700">
          Net Balance: {data.balance}
        </p>
      </div>
      {entries.length>0 && <input type="text" onChange={handleCommentSearch} className="h-15 w-[509px] m-3 px-2 py-2 block text-2xl bg-white border-2 rounded-lg border-blue border-opacity-50 outline-none text-blue-500 focus:border-blue-500" placeholder="Enter comments to search for..." />}
      {entries.length>0 && <div>
      <label className={cssClasses}>Filter By: </label>
      <Button onSelect = {handleFilter} isActive={filter==="Amount"}>Amount</Button>
      <Button onSelect = {handleFilter} isActive={filter==="Category"}>Category</Button>
      <Button onSelect = {handleFilter} isActive={filter==="Cash InFlow"}>Cash InFlow</Button>
      <Button onSelect = {handleFilter} isActive={filter==="Cash OutFlow"}>Cash OutFlow</Button>
      <Button onSelect = {handleFilter} isActive={filter==="Clear Filter"}>Clear Filter</Button>
          </div>}
        {filter==="Category" && <div>
      <label className={cssClasses}>Select Category: </label>
      <Button onSelect = {handleSubFilter} isActive={subFilter==="Salary"}>Salary</Button>
      <Button onSelect = {handleSubFilter} isActive={subFilter==="Food"}>Food</Button>
      <Button onSelect = {handleSubFilter} isActive={subFilter==="Health"}>Health</Button>
      <Button onSelect = {handleSubFilter} isActive={subFilter==="Savings and Investments"}>Savings and Investments</Button>
      <Button onSelect = {handleSubFilter} isActive={subFilter==="Subscription"}>Subscriptions</Button>
      <Button onSelect = {handleSubFilter} isActive={subFilter==="Other"}>Other</Button>
          </div>}
          {filter==="Amount" && <div className="flex gap-4">
      <label className={cssClasses}>Enter the Amount: </label>
        <input type="number"  onChange={handleChange} className="h-15 m-3 px-2 py-2 block text-2xl bg-white border-2 rounded-lg border-blue border-opacity-50 outline-none text-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>}
      {ent.length>0 ? (<ul>
        {ent.map((entry) => {
          let typClr = "text-green-700";
          if (entry.type === "CashOut") {
            typClr = "text-red-700";
          }
          return (
            <li
              key={entry.id}
              className="border-2 p-2 m-1 rounded-lg bg-blue-50"
            >
                <div className="flex justify-evenly border-2 rounded-md p-1 text-xl font-bold text-blue-700">
                  <p>{entry.date}</p>
                  <p>{entry.time}</p>
                </div>
                <div className="border-2 rounded-md flex justify-evenly text-left p-2 text-xl font-bold text-blue-700">
                  <p className={typClr}>{entry.amount}</p>
                  <p>{entry.comments}</p>
                </div>
                <div className="flex text-center m-4">
                  <span className="p-2 m-4 text-l font-bold bg-blue-700 text-white border-2 rounded-3xl">
                    {entry.category}
                  </span>
                  <span className="p-2 m-4 text-l font-bold bg-blue-700 text-white border-2 rounded-3xl">
                    Balance: {entry.bal}
                  </span>
                </div>
            </li>
          );
        })}
      </ul>) : <p className="text-2xl font-bold text-blue-700 text-center">No Results Found, Please check and add entries</p>}
    </div>
  );
}
