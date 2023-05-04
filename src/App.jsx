import GameField from "./components/GameField";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {generateCells, moveDown, moveLeft, moveRight, moveUp} from "./store/gameSlice";

const App = () => {
    const dispatchAction = useDispatch();

    useEffect(()=>{
        dispatchAction(generateCells());
    },[dispatchAction]);

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
                        dispatchAction(moveLeft());
                        break;
                    case "ArrowDown" :
                        dispatchAction(moveDown());
                        break;
                    default: return;
                }
            }

            window.addEventListener("keydown", handleInput);

            return () => {
                window.removeEventListener('keydown', handleInput);
            };

    }, [dispatchAction]);

    return (
        <>
            <GameField/>
        </>
    );
}

export default App;