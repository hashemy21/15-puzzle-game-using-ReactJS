import React, { useState } from 'react';
import Tile from './Tile';
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from './constants';
import { canSwap, shuffle, swap, isSolved } from './helpers';

function Board() {
	const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
	const [isStarted, setIsStarted] = useState(false);
	const [moves, updateMoves] = useState(0);

	console.log('is started:', isStarted);

	const shuffleTiles = () => {
		const shuffledTiles = shuffle(tiles);
		setTiles(shuffledTiles);
	};

	const swapTiles = (tileIndex) => {
		if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
			const swappedTiles = swap(
				tiles,
				tileIndex,
				tiles.indexOf(tiles.length - 1)
			);
			setTiles(swappedTiles);
		}
	};

	const handleTileClick = (index) => {
		swapTiles(index);
		updateMoves(moves + 1);
	};

	const handleShuffleClick = () => {
		shuffleTiles();
		updateMoves(0);
	};

	const handleStartClick = () => {
		shuffleTiles();
		setIsStarted(true);
		updateMoves(0);
	};

	const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
	const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
	const style = {
		width: BOARD_SIZE,
		height: BOARD_SIZE,
	};
	const hasWon = isSolved(tiles);

	return (
		<>
			<ul style={style} className="board">
				{tiles.map((tile, index) => (
					<Tile
						key={tile}
						index={index}
						tile={tile}
						width={pieceWidth}
						height={pieceHeight}
						handleTileClick={handleTileClick}
					/>
				))}
			</ul>
			{hasWon && isStarted && <div>Puzzle solved!!!</div>}
			{!isStarted ? (
				<button onClick={() => handleStartClick()}>Start game</button>
			) : (
				<button onClick={() => handleShuffleClick()}>Restart game</button>
			)}
			{!isStarted ? (
				<div>
					<span>Moves: {0}</span>
				</div>
			) : (
				<div>
					<span>Moves: {moves}</span>
				</div>
			)}
		</>
	);
}

export default Board;
