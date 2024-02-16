import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/antman.png",matched:false },
  { "src": "/img/batman.png",matched:false },
  { "src": "/img/flash.png",matched:false },
  { "src": "/img/hulk.png",matched:false },
  { "src": "/img/spiderMan.png",matched:false },
  { "src": "/img/superman.png",matched:false },
];

function App() {

   const [cards,setCards]=useState([]);
   const [turns,setTruns]=useState(0);
   const [choiceOne,setChoiceOne]=useState(null);
   const[choiceTwo,setChoiceTwo]=useState(null);
   const [disabled,setDisabled]=useState(false);
   
  //schuffle cards
  const shuffleCards=()=>{
    const shuffleCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id:Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTruns(0);
  }

  // handle a choice
  const handleChoice=(card)=>{
    choiceOne?setChoiceTwo(card):setChoiceOne(card);
  }

  useEffect(()=>{
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src===choiceTwo.src){
      setCards(prevCards=>{
        return prevCards.map(card=>{
          if(card.src===choiceOne.src){
            return {...card,matched:true};
          }
          else{
            return card;
          }
        })
      })    
    
    resetTurn();
      }
      else {
        setTimeout(()=>resetTurn(),1000);
        
      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards);

// reset choices and increase turn
  const resetTurn=(card)=>{
setChoiceOne(null);
    setChoiceTwo(null);
setTruns(prevTurns=>prevTurns+1);  
setDisabled(false);
  }
 
  // start a new game automatically
  useEffect(()=>{
    shuffleCards()
  },[])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card=>(
          <SingleCard 
          key={card.id}
           card={card} 
           handleChoice={handleChoice}
           flipped={card===choiceOne || card===choiceTwo || card.matched}
           disabled={disabled}
           />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>

  );
}

export default App;
