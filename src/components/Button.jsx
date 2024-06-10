export default function Button({children, onSelect, isActive}){
    let classes="p-2 m-3 lg:text-l lg:rounded-lg  text-m rounded-s border-2 border-blue-500 text-blue-700 hover:bg-blue-200 hover:text-stone-900"
    
    if(isActive){
        classes += " bg-blue-700 text-stone-100";
    }
    
    return(
        <button className={classes}  onClick={()=>{onSelect(children)}}>{children}</button>
    );
}