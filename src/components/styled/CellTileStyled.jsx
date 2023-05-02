import styled, {keyframes} from "styled-components";

const show = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const StyledTile = styled.div`
  --y: ${props => props.props.y};
  --x: ${props => props.props.x};
  --bg-lightness: ${props => props.props.bgLightness}%;
  --text-lightness: ${props => props.props.bgLightness < 50 ? 90 : 10}%;
  position: absolute;
  transform: translate(
          calc(var(--x) * (var(--cell-size) + var(--cell-gap))),
          calc(var(--y) * (var(--cell-size) + var(--cell-gap)))
  );
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--cell-size);
  height: var(--cell-size);
  border-radius: 1vmin;
  font-size: 7vmin;
  background: hsl(25,60%, var(--bg-lightness));
  color: hsl(25,60%, var(--text-lightness));
  transition: .5s ease-in-out;
  animation: ${show} .2s;
`;