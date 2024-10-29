import { useState, useEffect } from "react";

const LocalStorage = () => {
const [data, setData] = useState('');

useEffect(()=>{
const savedData = localStorage.getItem('key') ;
if(savedData){
    setData(savedData);
}
},[]);

const handleSave = () => {
    localStorage.setItem('key', data)
};
    return (<div>
<input type="text" value={data} onChange={(e)=> setData(e.target.value)} />
<button onClick={handleSave}>Sauvegarder</button>
    </div>)
};

export default LocalStorage;

