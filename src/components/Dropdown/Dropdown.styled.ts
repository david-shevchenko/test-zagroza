import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 295px;
  font-family: sans-serif;
`;
interface TriggerProps {
  hoverColor?: string;
  isOpen: boolean;
}
export const TextPlaceholder = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 125%;
  letter-spacing: 0;
  vertical-align: middle;
  color: #999999;
`;
interface TextitemsProps {
  size?: string;
}

export const Textitems = styled.p<TextitemsProps>`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: ${(props) => props.size || "14px"};
  line-height: 125%;
  letter-spacing: 0;
  vertical-align: middle;
  color: #6b7280;
`;
export const TextSelected = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 125%;
  letter-spacing: 0;
  vertical-align: middle;
  color: #333333;
`;
export const Trigger = styled.div<TriggerProps>`
  display: flex;
  border-radius: ${(props) => (props.isOpen ? "8px 8px 0 0" : "8px")};
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.isOpen ? "#666666" : "#D1D5DB")};
  background: #fff;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;
`;
export const Icon = styled.span<{ isOpen?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;

  svg {
    width: 8px;
    height: 6px;
    transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
    transition: transform 0.2s ease;
  }
`;

export const Menu = styled.ul`
  list-style: none;
  margin: 0;
  width: 100%;

  padding: 0;
  text-align: start;
  overflow-y: auto;
`;

export const Item = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: #f3f4f6;
  }
`;
export const ItemsBlock = styled.div`
  display: flex;
  width: 100%;
  height: 153px;
  position: absolute;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #666666;
  border-top: none;
  background: #fff;
  padding-bottom: 16px;
  border-radius: 0 0 8px 8px;
`;
export const SearchBar = styled.input`
  height: 28px;
  padding: 4px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
