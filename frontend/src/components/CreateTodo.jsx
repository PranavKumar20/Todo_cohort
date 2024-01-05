import { useEffect,useState } from "react"
// import './A.css'

export function CreateTodo({onAddTodo}){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    function addTodo(){
        fetch("http://localhost:3000/todo",{
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers:{
                "Content-type": "application/json"
            },
        })
        .then(async function(res){
            const json = await res.json();
            console.log(json);
            // alert("Todo Added");
            setShowMessage(true);
            onAddTodo();
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowMessage(false);
        }, 1000);
    
        return () => clearTimeout(timeoutId);
      }, [showMessage]);


    return  <div>
        <input style={{
                padding: 10,
                margin:10
            }} type="text" placeholder="title" onChange={ function(e){
                const value = e.target.value;
                setTitle(e.target.value);
                // setTitle(value);
            }}/><br />
        <input style={{
                padding: 10,
                margin:10
            }} type="text" placeholder="description" onChange={function(e){
                const value = e.target.value;
                setDescription(e.target.value);
                // setDescription(value);
            }} /><br />

        <button style={{
                padding: 10,
                margin:10
            }} 
            onClick={addTodo}
            >Add a todo</button>
            {showMessage && (<div style={{
                alignItems: "center",
                justifyContent: "center"
            }} className="message">Todo added</div>)}
    </div>
}