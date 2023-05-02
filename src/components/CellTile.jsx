import {StyledTile} from "./styled/CellTileStyled";
import {useDispatch, useSelector} from "react-redux";
import {updateCell} from "../store/gameSlice";
import {useEffect} from "react";

const CellTile = (props) => {
    const {x, y, value} = props;

    if (!value) return null;

    const bgLightness = 100 - Math.log2(value) * 9;

    return (
        <StyledTile props={{x, y, bgLightness: bgLightness}}>{value}</StyledTile>
    );
}

export default CellTile;