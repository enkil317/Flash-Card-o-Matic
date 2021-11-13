import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

function ViewDeck() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function editDeckHandler(deckId) {
    history.push(`/decks/${deckId}/edit`);
  }
  function studyHandler(deckId) {
    history.push(`/decks/${deckId}/study`);
  }
  function addCardsHandler(deckId) {
    history.push(`/decks/${deckId}/cards/new`);
  }
  
  function handleDelete(deckId) {
    const result = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (result) {
      deleteDeck(deckId);
    }
  }
  function handleCardDelete(cardId) {
    const result = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (result) {
      deleteCard(cardId)
      .then(() => readDeck(deckId))
      .then(setDeck);
    }
  }

  //if (deck.cards.length > 0) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div class="card">
        <div class="card-body">
          <h2 className="card title">{deck.name}</h2>
          <p>{deck.description}</p>
          <div>
            <button
              onClick={() => editDeckHandler(deckId)}
              class="btn btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => studyHandler(deckId)}
              class="btn btn-primary ml-2"
            >
              Study
            </button>
            <button
              onClick={() => addCardsHandler(deckId)}
              class="btn btn-primary ml-2"
            >
              Add Cards
            </button>
            <button
              onClick={() => handleDelete(deckId)}
              class="btn btn-danger float-right"
            >
              <span class="oi oi-trash"></span>
            </button>
          </div>
        </div>
      </div>
      {deck.cards.map((card) => (
        <div class="card ">
          <div class="card-body">
            <h5 class="card-title">{card.front}</h5>
            <p class="card-text">{card.back}</p>
            <button
              onClick={() => handleCardDelete(card.id)}
              class="btn btn-danger float-right"
            >
              <span class="oi oi-trash"></span>
            </button>
            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} class="btn btn-secondary float-right">
              Edit
            </Link>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewDeck;
