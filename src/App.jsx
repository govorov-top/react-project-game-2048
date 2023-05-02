import GameField from "./components/GameField";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {generateCells, moveRight, moveUp} from "./store/gameSlice";
import {logDOM} from "@testing-library/react";

const App = () => {
    const game = useSelector(state => state.game);
    const dispatchAction = useDispatch();

    useEffect(()=>{
        dispatchAction(generateCells());
    },[dispatchAction]);

    /*const [cells, setCells] = useState([]);
    const [isLoadedPlayField, setIsLoadedPlayField] = useState(false);*/
    console.log(game.cells)
    useEffect(() => {
            const handleInput = (e) => {
                switch (e.key) {
                    case "ArrowUp" :
                        dispatchAction(moveUp());
                        break;
                    case "ArrowRight" :
                        dispatchAction(moveRight());
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