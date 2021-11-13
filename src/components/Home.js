import React, { useState, useEffect } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import { Link } from "react-router-dom";



function Home() {
    const [decks, setDecks] = useState([]);

    const loadDecks = () => {
        listDecks().then(setDecks)
    }

    useEffect(() => {
        loadDecks()
    }, []);

   function handleDelete(deckId) {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
        if(result) {deleteDeck(deckId).then(loadDecks)}
   }

    // const deckDisplay = () => {
    //     decks.map(deck => {
    //         return console.log(deck)
    //     })
   // }

   // console.log(deckDisplay)

    return (
       <>
       <Link class="btn btn-primary btn-lg" to="/decks/new">
          <span class="oi oi-plus"></span> Create Deck  </Link> {
                decks.map((deck) => ( <div class="card mb-3">
    
    <div class="card-body">
      <div className="row">
          <div className="col">
          <h5 class="card-title">{deck.name}</h5>
          </div>
          <div className="col">
              <p className="float-right">{deck.cards.length} cards</p>
          </div>
      </div>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Link to={`/decks/${deck.id}`} class="btn btn-info"><span class="oi oi-eye"></span>View</Link>
    <Link to={`/decks/${deck.id}/study`} class="btn btn-secondary">Study</Link>
    <button href="#" onClick= {()=>handleDelete(deck.id)} class="btn btn-danger float-right"><span class="oi oi-trash"></span></button>
  </div>
  </div>
))
}
  </>
);
}
  
export default Home;