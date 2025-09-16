import { useId } from "react";
import styled from "styled-components";
interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  className?: string;
}

export const Toggle = ({
  checked,
  onChange,
  label,
  className,
}: ToggleProps) => {
  const id = useId();
  return (
    <Root className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Wrap>
        <Track $checked={checked} onClick={() => onChange(!checked)}>
          <Knob $checked={checked} />
        </Track>
      </Wrap>
    </Root>
  );
};

const Root = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #111827;
`;

const Wrap = styled.span`
  position: relative;
  display: inline-block;
`;
const Track = styled.div<{ $checked: boolean }>`
  cursor: pointer;
  width: 44px;
  height: 24px;
  background: ${({ $checked }) => ($checked ? "#22c55e" : "#e5e7eb")};
  border-radius: 9999px;
  transition: background-color 0.2s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  position: relative;
`;

const Knob = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $checked }) => ($checked ? "22px" : "2px")};
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: left 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
`;
