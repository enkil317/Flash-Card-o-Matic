import React from "react";
import { Route, Switch, useParams, useRouteMatch, Link, NavLink } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import { Redirect } from "react-router";
import CreateDeck from "../components/Decks/CreateDeck";
import ViewDeck from "../components/Decks/ViewDeck";
import StudyDeck from "../components/Decks/StudyDeck";
import EditDeck from "../components/Decks/EditDeck";
import AddCard from "../components/Cards/AddCard";
import EditCard from "../components/Cards/EditCard";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks">
            <Redirect to="/" />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            {/*route to view a specific deck*/}
            <ViewDeck />
          </Route>

          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
        {/* TODO: Implement the screen starting here */}
        <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
