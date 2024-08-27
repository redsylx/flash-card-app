import React, { ReactElement, useState } from "react";

interface IconContainerProps {
    children: ReactElement;
    isActive?: boolean;
    isDisabled?: boolean;
  }
  

const IconContainer : React.FC<IconContainerProps> = ({ children, isActive = false, isDisabled = false}) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

    const childWithProps = React.cloneElement(children, {
        className: `${isHovered ? 'custom-icon-hover' : isActive ? 'custom-icon-active' : 'custom-icon'}`,
      });
    return (
        <div className={`${isHovered ? 'custom-icon-container-hover' : isActive ? 'custom-icon-container-active' : 'custom-icon-container'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {childWithProps}
        </div>
    )
}

export {
    IconContainer
}

export type {
    IconContainerProps
}