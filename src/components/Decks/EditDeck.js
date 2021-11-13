import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";




export default function EditDeck() {
    const [deck, setDeck] = useState({ cards: [] });
    const { deckId } = useParams();
    const history = useHistory();


    useEffect(() => {
        readDeck(deckId).then(setDeck);
  
}, [deckId]);  

function editHandler(event) {
    event.preventDefault();
setDeck({...deck, [event.target.id]: event.target.value})
}
function SubmitHandler(event) {            
    event.preventDefault();
    updateDeck(deck).then((deckEdited) => history.push(`/decks/${deckEdited.id}`));

}

    return(
        <div>
        <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
    <form onSubmit={SubmitHandler}>
    <h1>Create Deck</h1>
    <div>
<label htmlFor="name">Name</label>
<input id="name" type="text" name="name" placeholder="Deck Name" onChange={editHandler} value={deck.name} style={{width:"100%"}}/>      
</div>

<div>
<label htmlFor="description">Description</label>
<textarea
id="description"

required
placeholder="Brief description of the deck"
onChange={editHandler}
value={deck.description}
style={{width:"100%"}}
></textarea>
</div>
<Link to={"/"}><button className="btn btn-secondary">Cancel</button></Link>
<button className="btn btn-primary ml-2">Submit</button>
</form>
  </div>
    )
}



 
