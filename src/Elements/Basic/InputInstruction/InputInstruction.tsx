import ImportSVG from 'Lib/Helpers/CustomSVGImporter';
import React from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

import './InputInstruction.scss';

interface Iprops {
    content: string
}

const InputInstruction = (props: Iprops) => {
    
    const popover:any = (
        <Popover id="input-popover" >
          <Popover.Content>
           {props.content}
          </Popover.Content>
        </Popover>
      );

      const button:any = (
        <Button id="input-instruction" variant="link" size="sm" className="d-inline float-right">
        <ImportSVG name="info-circle-outline" color="#555555" size={16} />
        </Button>
      )
      
    return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
            {button}
    </OverlayTrigger>
    );
 };

export default InputInstruction;