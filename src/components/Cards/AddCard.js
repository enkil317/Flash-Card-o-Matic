import React, { useEffect, useState } from "react";
import { Link, useParams,  } from "react-router-dom";
import FormCard from "./FormCard";
import { readDeck, createCard } from "../../utils/api";

export default function AddCard() {
const { deckId } = useParams();
const [deck, setDeck] = useState({ cards: [] })
const [newCard, setNewCard] = useState({front:"",back:""});

useEffect(() => {
    readDeck(deckId).then(setDeck);

}, [deckId]);  

function SubmitHandler(event) {            
    event.preventDefault();
    createCard(deckId, newCard);
setNewCard({front:"",back:""})
}
// function handleChange(event) {
//     event.preventDefault();
//     setNewCard({...newCard, [event.target.id]: event.target.value});
// }
return (
    <div>
        <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Add Card</li>
      </ol>
    </nav>
    {/* <form onSubmit={SubmitHandler}> */}
    <h1>{deck.name}<span>: Add Card</span></h1>
    <div>
{/* <label htmlFor="front">Front</label>
<textarea id="front" type="text" name="name" placeholder="Front side of card" onChange={handleChange} value={newCard.front} style={{width:"100%"}}/>      
</div>

<div>
<label htmlFor="back">Back</label>
<textarea
id="back"

required
placeholder="Back side of card"
onChange={handleChange}
value={newCard.back}
style={{width:"100%"}}
></textarea>
</div>
<Link to={`/decks/${deckId}`}><button className="btn btn-secondary">Done</button></Link>
<button type="submit" className="btn btn-primary ml-2">Save</button>
</form> */}
      <FormCard SubmitHandler={SubmitHandler} deck={deck} />
</div>
  </div>
    
)
}



