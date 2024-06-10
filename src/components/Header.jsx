import { useSelector } from "react-redux";
import {CSVLink} from 'react-csv';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { RiFileExcel2Line } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";


export default function Header(){
    const data = useSelector((state) => state.inp);
    let entries = data.entries;
    
    const headers=[
        {label: "Type", key: "type"},
        {label:"Date", key: "date"},
        {label:"Time", key: "time"},
        {label:"Amount", key: "amount"},
        {label:"Comments", key: "comments"},
        {label:"Category", key: "category"},
        {label:"Balance", key: "bal"}];

        
        function handleSavePDF(){
            const doc = new jsPDF();

        console.log(entries);
        autoTable(doc, {
        
            head: [["Type","Date","Time","Amount","Comments","Category","Balance"]],
            body: entries,
            columns: [
                { header: 'Type', dataKey: 'type' },
                { header: 'Date', dataKey: 'date' },
                { header: 'Time', dataKey: 'time' },
                { header: 'Amount', dataKey: 'amount' },
                { header: 'Comments', dataKey: 'comments' },
                { header: 'Category', dataKey: 'category' },
                { header: 'Balance', dataKey: 'bal' },
                
              ],
             
          });
          
          doc.save('CashFlow_Data.pdf');
        }
   
    return(
        <div className="bg-sky-400 h-[100px] relative" >
            <div className="flex">
            <h1 className="text-4xl  m-auto font-bold text-slate-50 p-9 text-center inline">CashFlow Tracker</h1>
            <CSVLink data={entries} headers={headers} filename="CashFlow_Data" className="p-9 text-4xl" ><RiFileExcel2Line /></CSVLink>
            <button onClick={handleSavePDF} className="p-9 text-4xl"><FaFilePdf /></button>
            </div>
        </div>
    );
}