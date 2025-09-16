import type { ReactNode, FC } from "react";
import styled from "styled-components";

interface BoardLayoutProps {
  children: ReactNode;
}

export const BoardLayout: FC<BoardLayoutProps> = ({ children }) => {
  const BoardComponent = styled.div`
    display: flex;
    gap: 20px;
  `;
  return <BoardComponent>{children}</BoardComponent>;
};
