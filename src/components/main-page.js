// src/Greeting.js
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { div } from 'framer-motion/client';

const Greeting = () => {
  const parentContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  };
  const pageContainerStyle = {
    display: 'flex',
    width: '80%',
    minHeight: '80%',
    flexDirection: 'column',
  };

  // State to manage the accordion data
  const [accordions, setAccordions] = useState([
    { header: 'Header 1', content: 'Content 1', linkContent: [{ name: 'testName', link: 'testLink' }, { name: 'testName', link: 'testLink' }] },
    { header: 'Header 2', content: 'Content 2', linkContent: [{ name: 'testName', link: 'testLink' }] },
    { header: 'Header 3', content: 'Content 3', linkContent: [{ name: 'testName', link: 'testLink' }] },
  ]);

  // Handler to add new accordion
  const onAddition = () => {
    const newAccordion = { header: 'New Header', content: 'New Content', linkContent: [{ name: 'testName', link: 'testLink' }] };
    setAccordions([...accordions, newAccordion]);
  };

  // Handler to delete an accordion
  const onDelete = (index) => {
    const updatedAccordions = accordions.filter((_, i) => i !== index);
    setAccordions(updatedAccordions);
  };

  return (
    <div style={parentContainerStyle}>
      <div style={pageContainerStyle}>
        {accordions.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <ExpandMoreIcon />
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(index)}
                size="small"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              </div>
            }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <div style={{ flex: 1 }}>{item.header}</div>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(0, 0, 0, 0.54)',flexDirection:'column',Width: '100%', padding:'20px'}}>
              {item.linkContent.map((linkItem, linkIndex)=>(
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',margin:'20px 0px', fontSize:'18px' }}>
                  <div style={{width: '50%', paddingLeft:'20px', fontWeight:'500'}}>
                    {linkItem.name}
                    </div>
                  <div style={{width: '50%' }}>
                    {linkItem.link}
                    </div>
              </div>
            ))}
              </div>
              </AccordionDetails>
          </Accordion>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            cursor: 'pointer',
            paddingRight: '20px',
            paddingTop: '3px',
            color: 'rgba(0, 0, 0, 0.54)'
          }}
        >
          <AddIcon onClick={onAddition} />
        </div>
      </div>
    </div>
  );
};

export default Greeting;
