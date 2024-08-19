import React from "react";
import styled from "@emotion/styled";

interface NameBubbleProps {
  name:string;
};

const Bubble = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: Teal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: Turquoise;
  border-radius: 2rem;
  margin: 0;
`;

const NameBubble = ({name}:NameBubbleProps) => {
  const abbrev = name.split(" ", 2).map(n => n.charAt(0)).join("");

  return (
    <Bubble>
      {abbrev}
    </Bubble>
  );
};

export default NameBubble;