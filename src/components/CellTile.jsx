import {StyledTile} from "./styled/CellTileStyled";

const CellTile = (props) => {
    const {x, y, value} = props;
    const bgLightness = 100 - Math.log2(value) * 9;

    return (
        <StyledTile props={{
            x,
            y,
            bgLightness: bgLightness
        }}>{value}</StyledTile>
    );
}

export default CellTile;