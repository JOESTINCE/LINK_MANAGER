// src/Greeting.js
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const Greeting = ({ name }) => {
  const parentContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
  }
  const pageContainerStyle = {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '80%',
    minHeight: '80%',
    flexDirection: 'column',
    // boxShadow: 'inset 0px 0px 4px 3px rgba(0, 0, 0, 0.1)'

  }
  let accordianDiv = [];
  const data = [{ header: 'header', content: 'content' }, { header: 'header', content: 'content' }, { header: 'header', content: 'content' }, { header: 'header', content: 'content' }]
  for(let i=0; i<=data?.length; i++){
    accordianDiv.push(<Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
       {data?.[i]?.header}
      </AccordionSummary>
      <AccordionDetails>
        {data?.[i]?.content}
      </AccordionDetails>
    </Accordion>)
  }
 const onAddition = ()=>{
    accordianDiv.push(<Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        heading
      </AccordionSummary>
      <AccordionDetails>
        content
      </AccordionDetails>
    </Accordion>)
    console.log(accordianDiv.length);
  }
  return (
    <div style={parentContainerStyle}>
      <div style={pageContainerStyle}>
        {accordianDiv}
        <div style={{display:'flex', justifyContent:'end', cursor: 'pointer', paddingRight: '15px', paddingTop:'3px'}}>
          <AddIcon onClick={onAddition}></AddIcon>
        </div>
      </div>
    </div>
  );
};

export default Greeting;