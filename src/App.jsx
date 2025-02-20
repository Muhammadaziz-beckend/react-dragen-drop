import { useState } from "react";
import "./static/css/stayle.css";

function App() {
  const [cardList, setCardList] = useState([
    { id: 2, order: 2, img: "src/static/images/image2.png", text: "Mersedens" },
    {
      id: 3,
      order: 3,
      img: "src/static/images/image3.png",
      text: "Dodge Charger",
    },
    {
      id: 4,
      order: 4,
      img: "src/static/images/image4.png",
      text: "Dodge Charger",
    },
    { id: 5, order: 5, img: "src/static/images/image5.png", text: "Ferari" },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  const dragStartHandler = (e, card) => {
    setCurrentCard(card);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };

  const dragLeaveHandler = (e) => {
    e.target.style.background = "white";
  };

  const dragEndHandler = (e) => {
    e.target.style.background = "white";
  };

  const dropHandler = (e, targetCard) => {
    e.preventDefault();

    setCardList(
      (prev) =>
        prev
          .map((c) => {
            if (c.id === targetCard.id) {
              return { ...c, order: currentCard.order }; // Меняем на order текущей карточки
            }
            if (c.id === currentCard.id) {
              return { ...c, order: targetCard.order }; // Меняем на order целевой карточки
            }
            return c;
          })
          .sort((a, b) => a.order - b.order) // Сортируем по order
    );

    e.target.style.background = "white";
  };

  const sortCarts = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="app">
      {cardList.sort(sortCarts).map((card) => (
        <div
          key={card.id}
          className="card"
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDragEnd={dragEndHandler}
          onDrop={(e) => dropHandler(e, card)}
        >
          <img src={card.img} alt="" />
          <p>{card.text}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
