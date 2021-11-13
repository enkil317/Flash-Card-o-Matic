import React, { useState,  } from "react";
import { createDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";

export default function CreateDeck() {
    const [newDeck, setNewDeck] = useState({name:"",description:""});
    const history = useHistory();

    function handleChange(event) {
        event.preventDefault();
        console.log(event.target.id, event.target.value)
        setNewDeck({...newDeck, [event.target.id]: event.target.value});

    }

     
      
        function SubmitHandler(event) {            
            event.preventDefault();
            console.log(newDeck)
            createDeck(newDeck).then((deck) => history.push(`/decks/${deck.id}`));

            setNewDeck({name:"",description:""})
        }


    return (
        <div>
            <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">
            Create Deck
          </li>
        </ol>
      </nav>
      
      <form onSubmit={SubmitHandler}>
          <h1>Create Deck</h1>
          <div>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" placeholder="Deck Name" onChange={handleChange} value={newDeck.name} style={{width:"100%"}}/>      
      </div>

      <div>
    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      
      required
      placeholder="Brief description of the deck"
      onChange={handleChange}
      value={newDeck.description}
      style={{width:"100%"}}
    ></textarea>
    </div>
    <Link to={"/"}><button className="btn btn-secondary">Cancel</button></Link>
    <button className="btn btn-primary ml-2">Submit</button>
      </form>
        </div>
    )
}
