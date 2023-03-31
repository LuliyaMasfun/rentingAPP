import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { IoChevronForward } from 'react-icons/io5';

const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;
const DropdownContent = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
`;
const DropdownOption = styled.div`
  display: block;
  padding: 12px 16px;
  color: black;
 
`;
const DropdownButton = styled(IoChevronForward)`
position: absolute;
margin-left: 80px;
margin-top: -12px;
color: #EFEFEF;
transform: rotate(90deg);
`;

function DropDown({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleOptions}>
        {selectedOption.label}
      </DropdownButton>
      {isOpen && (
        <DropdownContent>
          {options.map((option) => (
            <DropdownOption
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
}
export default DropDown;