import { useState, DragEvent } from "react";

import { Board, DATA, Todo } from "./data";
import "./App.css";

function App() {
	const [boards, setBoards] = useState(DATA);
	const [currentBoard, setCurrentBoard] = useState<null | Board>(null);
	const [currentItem, setCurrentItem] = useState<null | Todo>(null);

	// Запускается в момент, когда пользователь начинает перетаскивать элемент.
	const dragStartHandler = (event: DragEvent<HTMLDivElement>, item: Todo, board: Board) => {
		console.log("dragStartHandler");
		setCurrentBoard(board);
		setCurrentItem(item);
	};

	// Срабатывает, когда перетаскиваемый элемент находится над другим элементом, пока пользователь удерживает кнопку мыши.
	const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const target = event.target as HTMLDivElement;
		if (target.className == "item") {
			target.style.boxShadow = "0 5px 4px gray";
		}
	};

	// Вызывается, когда перетаскиваемый элемент не отпущен но покидает область элемента над которым находился.
	const dragLeaveHandler = (event: DragEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		target.style.boxShadow = "none";
	};

	// Момент завершения операции перетаскивания, при отпускании кнопки мыши.
	const dragEndHandler = (event: DragEvent<HTMLDivElement>) => {
		console.log("dragEndHandler");
		const target = event.target as HTMLDivElement;
		target.style.boxShadow = "none";
	};

	// Cрабатывает, когда перетаскиваемый элемент отпускается над другим элементом
	const dropHandler = (event: DragEvent<HTMLDivElement>, item: Todo, board: Board) => {
		console.log("dropHandler");
		event.preventDefault();
		if (currentBoard && currentItem) {
			const currentIndex = currentBoard.items.indexOf(currentItem);
			currentBoard.items.splice(currentIndex, 1);

			const dropIndex = board.items.indexOf(item);
			board.items.splice(dropIndex + 1, 0, currentItem);
			setBoards((prevBoards) =>
				prevBoards.map((b) => {
					if (b.id === board.id) {
						return board;
					}
					if (b.id === currentBoard.id) {
						return currentBoard;
					}
					return b;
				})
			);
		}
	};

	const dropCardHandler = (event: DragEvent<HTMLDivElement>, board: Board) => {
		if (currentBoard && currentItem && !board.items.length) {
			board.items.push(currentItem);
			const currentIndex = currentBoard.items.indexOf(currentItem);
			currentBoard.items.splice(currentIndex, 1);

			setBoards((prevBoards) =>
				prevBoards.map((b) => {
					if (b.id === board.id) {
						return board;
					}
					if (b.id === currentBoard.id) {
						return currentBoard;
					}
					return b;
				})
			);
		}
	};

	return (
		<div className="app">
			{boards.map((board) => (
				<div
					className="board"
					onDragOver={dragOverHandler}
					onDrop={(event) => dropCardHandler(event, board)}
					key={board.id}
				>
					<div className="board__title">{board.title}</div>
					<div className="items">
						{board.items.map((item) => (
							<div
								onDragStart={(event) => dragStartHandler(event, item, board)}
								onDragOver={dragOverHandler}
								onDragLeave={dragLeaveHandler}
								onDragEnd={dragEndHandler}
								onDrop={(event) => dropHandler(event, item, board)}
								className="item"
								draggable
								key={item.id}
							>
								{item.title}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default App;
