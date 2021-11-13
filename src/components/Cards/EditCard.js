import React, { useEffect, useState } from "react";
import FormCard from "./FormCard";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";

export default function EditCard() {
const { deckId, cardId } = useParams();
const [card, setCard] = useState({front:"",back:""});
const [deck, setDeck] = useState({ cards: [] });
const history = useHistory();

useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
    // eslint-disable-next-line
}, [deckId,cardId]);  

function SubmitHandler(event) {            
    event.preventDefault();
    updateCard(card).then (history.push(`/decks/${deckId}`))
}
// function handleChange(event) {
//     event.preventDefault();
//     setCard({...card, [event.target.id]: event.target.value});
// }
return (
    <div>
        <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Edit Card{card.id}</li>
      </ol>
    </nav>
    {/* <form onSubmit={SubmitHandler}> */}
    <h1>{deck.name}<span>: Edit Card</span></h1>
    <div>
{/* <label htmlFor="front">Front</label>
<textarea id="front" type="text" name="name" placeholder="Front side of card" onChange={handleChange} value={card.front} style={{width:"100%"}}/>      
</div>

<div>
<label htmlFor="back">Back</label>
<textarea
id="back"

required
placeholder="Back side of card"
onChange={handleChange}
value={card.back}
style={{width:"100%"}}
></textarea>
</div>
<Link to={`/decks/${deckId}`}><button className="btn btn-secondary">Cancel</button></Link>
<button type="submit" className="btn btn-primary ml-2">Submit</button>
</form> */}
{card.id && (
        <FormCard card={card} setCard={setCard} SubmitHandler={SubmitHandler} />
      )}
      </div>
  </div>
)
}



