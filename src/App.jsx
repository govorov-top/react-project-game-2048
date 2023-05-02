import GameField from "./components/GameField";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {generateCells, moveUp} from "./store/gameSlice";

const App = () => {
    const dispatchAction = useDispatch();

    useEffect(()=>{
        dispatchAction(generateCells());
    },[dispatchAction]);

    /*const [cells, setCells] = useState([]);
    const [isLoadedPlayField, setIsLoadedPlayField] = useState(false);*/

    useEffect(() => {
            const handleInput = (e) => {
                switch (e.key) {
                    case "ArrowUp" :
                        dispatchAction(moveUp());
                        break;
                    case "ArrowRight" :
                        //moveRight();
                        break;
                    case "ArrowLeft" :
                        //moveLeft();
                        break;
                    case "ArrowDown" :
                        //moveDown();
                        break;
                    default: return;
                }
            }
            /*const groupCellsByColumn = () => {
                const cellsFiltered = cells.filter(cell => cell.type !== 'tile')
                return cellsFiltered.reduce((groupCells, cell) => {
                    groupCells[cell.x] = groupCells[cell.x] || [];
                    groupCells[cell.x][cell.y] = cell;
                    return groupCells;
                }, [])
            }
            const moveUp = () => {
                slideTiles(groupCellsByColumn());
            }
            const slideTiles = (groupedCells) => {
                groupedCells.forEach(group => slideTilesInGroup(group))
            }
            const slideTilesInGroup = (group) => {

                for (let i = 1; i < group.length; i++) {
                    if (group[i].isEmpty) continue;

                    const cellWithTile = group[i];

                    let targetCell;
                    let j = i - 1;
                    console.log(group[j])
                    while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)){
                        targetCell = group[j];
                        j--;
                    }

                    if (!targetCell) continue;

                    if (targetCell.isEmpty){
                        targetCell.linkTile(cellWithTile.linkedTile);
                    }else {
                        targetCell.linkTileForMerge(cellWithTile.linkedTile);
                    }

                    cellWithTile.unlinkTile();
                }
            }*/

            window.addEventListener("keydown", handleInput);

            return () => {
                window.removeEventListener('keydown', handleInput);
            };
    }, [dispatchAction]);

    /*useEffect(() => {
        /!*setIsLoadedPlayField(false);
        const gridSize = 4;
        const gridCount = Math.pow(gridSize,2);
        const gridCountTile = 2;
        let newArray = [];
        for (let i = 0; i < gridCount; i++) {
            newArray.push({
                id: uuidv4(),
                type: 'cell',
                x: i % gridSize,
                y: Math.floor(i / gridSize),
                isEmpty: true,
            });
        }
        for (let i = gridCount; i < gridCount + gridCountTile; i++) {
            newArray.push({
                id: uuidv4(),
                type: 'tile',
                x: i % gridSize,
                y: Math.floor(i / gridSize),
                isEmpty: false,
                value: 2,
            });
        }
        setCells(newArray);
        setIsLoadedPlayField(true)*!/
    }, []);*/

    return (
        <>
            <GameField/>
        </>
    );
}

export default App;