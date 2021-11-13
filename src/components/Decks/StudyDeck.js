import React, { useState,useEffect } from "react";
import { Link,useParams,useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

function Study() {
    const [deck, setDeck] = useState({cards: [] });
    const [cardNumber, setCardNumber] = useState(0);
    const [flip, setFlip] = useState("front");
    const { deckId } = useParams();
    const history = useHistory();

    console.log(deck);

    useEffect(() => {
              readDeck(deckId).then(setDeck);
             //setCards(deck.cards);
        
    }, [deckId]);   

     function flipHandler() {
        if(flip === "back") {
            setFlip("front")
        } else {
            setFlip("back")
        }
    }

   

    function nextCard() {
        setCardNumber((cardNumber) => cardNumber +1);
            setFlip("front");

        if ((cardNumber +1)  === deck.cards.length && flip === "back") {
            const restartCards = window.confirm(
                "Restart cards?\n\nClick 'cancel' to return to the home page"
                );
                if(restartCards) {setCardNumber(0);
                    setFlip("front");
                } else {
                    history.push("/"); 
            }    
        }
        
       
}
    function NotEnoughCards() {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
                </p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
                    Add Cards
                </Link>
            </div>
        );
    }
        if (!deck.id) {
            return "loading"
        }
    if (deck.cards.length >= 3) {
        return ( 
            <>
            <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Study</li>
      </ol>
    </nav>
    
    <h2>{`${deck.name}: Study`}</h2>
    
            <div class="card">
      <div class="card-body">
          <h5 class="card-title">
              Card {cardNumber + 1} of {deck.cards.length}
              </h5> 
              {flip === "front" && <p class="card-text">{deck.cards[cardNumber]["front"]}</p>}
              {flip === "back" && <p class="card-text">{deck.cards[cardNumber]["back"]}</p>}
    
        <button class="btn btn-secondary mr-2" onClick={() => flipHandler()}>
            Flip
        </button>
        {flip === "back" && (
            <button class="btn btn-primary" onClick={nextCard}>
                Next
            </button>
        )}

       </div>
       </div>
            </>
        )        
    } 
    return (<div> <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><Link to="/">Home</Link></li>
      <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
      <li class="breadcrumb-item active" aria-current="page">Study</li>
    </ol>
  </nav>
  <NotEnoughCards />
    </div>)
  
}


export default Study;
