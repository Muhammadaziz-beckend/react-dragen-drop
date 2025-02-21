import { useState } from "react";
import "./static/css/stayle.css";

// 1
// function App() {
//   const [cardList, setCardList] = useState([
//     { id: 2, order: 2, img: "src/static/images/image2.png", text: "Mersedens" },
//     {
//       id: 3,
//       order: 3,
//       img: "src/static/images/image3.png",
//       text: "Dodge Charger",
//     },
//     {
//       id: 4,
//       order: 4,
//       img: "src/static/images/image4.png",
//       text: "Dodge Charger",
//     },
//     { id: 5, order: 5, img: "src/static/images/image5.png", text: "Ferari" },
//   ]);

//   const [currentCard, setCurrentCard] = useState(null);

//   const dragStartHandler = (e, card) => {
//     setCurrentCard(card);
//   };

//   const dragOverHandler = (e) => {
//     e.preventDefault();
//     e.target.style.background = "lightgray";
//   };

//   const dragLeaveHandler = (e) => {
//     e.target.style.background = "white";
//   };

//   const dragEndHandler = (e) => {
//     e.target.style.background = "white";
//   };

//   const dropHandler = (e, targetCard) => {
//     e.preventDefault();

//     setCardList(
//       (prev) =>
//         prev
//           .map((c) => {
//             if (c.id === targetCard.id) {
//               return { ...c, order: currentCard.order }; // Меняем на order текущей карточки
//             }
//             if (c.id === currentCard.id) {
//               return { ...c, order: targetCard.order }; // Меняем на order целевой карточки
//             }
//             return c;
//           })
//           .sort((a, b) => a.order - b.order) // Сортируем по order
//     );

//     e.target.style.background = "white";
//   };

//   const sortCarts = (a, b) => {
//     if (a.order > b.order) {
//       return 1;
//     } else {
//       return -1;
//     }
//   };

//   return (
//     <div className="app">
//       {cardList.sort(sortCarts).map((card) => (
//         <div
//           key={card.id}
//           className="card"
//           draggable={true}
//           onDragStart={(e) => dragStartHandler(e, card)}
//           onDragOver={dragOverHandler}
//           onDragLeave={dragLeaveHandler}
//           onDragEnd={dragEndHandler}
//           onDrop={(e) => dropHandler(e, card)}
//         >
//           <img src={card.img} alt="" />
//           <p>{card.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

const App = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Task 1",
      items: [
        { id: 1, title: "qwe1" },
        { id: 2, title: "qwe2" },
        { id: 3, title: "qwe3" },
      ],
    },
    {
      id: 2,
      title: "Task 2",
      items: [
        { id: 4, title: "qwe4" },
        { id: 5, title: "qwe5" },
        { id: 6, title: "qwe6" },
      ],
    },
    {
      id: 3,
      title: "Task 3",
      items: [
        { id: 7, title: "qwe7" },
        { id: 8, title: "qwe8" },
        { id: 9, title: "qwe9" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("item")) {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dropHandler = (e, board, item) => {
    e.preventDefault();
    if (!currentItem || !currentBoard) return;
  
    // Создаем копии массивов для обновления состояния
    const currentBoardCopy = { ...currentBoard, items: [...currentBoard.items] };
    const boardCopy = { ...board, items: [...board.items] };
  
    // Удаляем элемент из текущего board
    currentBoardCopy.items = currentBoardCopy.items.filter(i => i.id !== currentItem.id);
  
    // Определяем индекс, куда вставить элемент
    const dropIndex = boardCopy.items.indexOf(item);
    boardCopy.items.splice(dropIndex + 1, 0, currentItem);
  
    // Обновляем состояние
    setBoards(boards.map(b => {
      if (b.id === boardCopy.id) return boardCopy;
      if (b.id === currentBoardCopy.id) return currentBoardCopy;
      return b;
    }));
  };
  

  const dropBoardHandler = (e, board) => {
    e.preventDefault();
    if (!currentItem || !currentBoard) return;
  
    // Копируем boards, чтобы не мутировать state напрямую
    const updatedBoards = boards.map((b) => ({ ...b, items: [...b.items] }));
  
    // Находим текущую доску и удаляем элемент
    const currentBoardIndex = updatedBoards.findIndex((b) => b.id === currentBoard.id);
    updatedBoards[currentBoardIndex].items = updatedBoards[currentBoardIndex].items.filter(
      (i) => i.id !== currentItem.id
    );
  
    // Находим новую доску и добавляем элемент
    const targetBoardIndex = updatedBoards.findIndex((b) => b.id === board.id);
    updatedBoards[targetBoardIndex].items.push(currentItem);
  
    // Обновляем состояние
    setBoards(updatedBoards);
  };
  
  

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          key={board.id}
          className="board"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropBoardHandler(e, board)}
        >
          <div className="board__title">{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              className="item"
              draggable
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragOver={dragOverHandler}
              onDragLeave={dragLeaveHandler}
              onDragEnd={dragEndHandler}
              onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;