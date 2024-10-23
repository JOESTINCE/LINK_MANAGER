// src/Greeting.js
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase'; // Import Firestore instance
import encryptDataService from '../services/encrypt-decrypt.service';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

const Greeting = () => {
  const colors = [
    {
      color:'red'
    },
    {
      color: 'blue'
    },
    {
      color: 'yellow'
    },
    {
      color: 'green'
    },
    {
      color: 'orange'
    },
    {
      color: 'grey'
    },
    {
      color: 'violet'
    },
    {
      color: 'indigo'
    },
    {
      color: 'red'
    },
    {
      color: 'red'
    },

  ]
  const LinkCollection = collection(db, 'LinkCollection'); // Reference to 'users' collection
  const customInputProperties = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Border color
      },
      input: {
        color: 'white', // Input text color
        backgroundColor: 'rgb(213 213 213 / 20%)'
      },
      '&:hover fieldset': {
        borderColor: 'blue', // Hover color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // Focused color
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', // Focused label color
    },
  }
  const [accordions, setAccordions] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically
  // const [color, setColor] = useState('#fff');
  const [displayPicker, setDisplayPicker] = useState();
  // const handleColorChange = (newColor) => {
  //   setColor(newColor.hex);
  //   console.log('newColor')
  // };
  // Handler to update Accordion headers
  const handleAccordionHeaderChange = (index, event) => {
    const { value } = event.target;
    const updatedAccordions = [...accordions];
    updatedAccordions[index].header = value;
    setAccordions(updatedAccordions);
  };

  // Handler to update Accordion content
  const handleAccordionContentChange = (accordionIndex, contentIndex, field, value) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[accordionIndex].content[contentIndex][field] = value;
    setAccordions(updatedAccordions);
  };

  // Handler to add new Accordion
  const handleAddAccordion = () => {
    setAccordions([...accordions, { header: '', content: [{ name: '', link: '' }], headerBackGroundColor:'rgb(0, 0, 255)' }]);
  };

  // Handler to remove an Accordion
  const handleRemoveAccordion = (index) => {
    setAccordions(accordions.filter((_, i) => i !== index));
  };

  // Handler to add new content to an Accordion
  const handleAddContent = (accordionIndex) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[accordionIndex].content.push({ name: '', link: '' });
    setAccordions(updatedAccordions);
  };

  // Handler to remove content from an Accordion
  const handleRemoveContent = (accordionIndex, contentIndex) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[accordionIndex].content = updatedAccordions[accordionIndex].content.filter(
      (_, i) => i !== contentIndex
    );
    setAccordions(updatedAccordions);
  };
  const [isEdit, changeIsEdit] = useState('false');
  function onButtonClick(){
    console.log('isEdit', isEdit);
    if(isEdit==='false' || !accordions?.length){
      changeIsEdit('true');
    }
    else{
      updateLink();
      changeIsEdit('false');
      setDisplayPicker()
    }
  }
  const fetchUserByEmail = async (email) => {
    try {
      const q = query(LinkCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data(); // Assuming only one result
        setAccordions(userData?.links);
        setLoader(false)
      } else {
        setLoader(false)
        console.log("No user found with the provided email.");
        changeIsEdit('true');
      }
    } catch (error) {
      setLoader(false)
      console.error("Error fetching user:", error);
    } 
  };
  useEffect(() => {
    if (localStorage.getItem('email')){
      setLoader(true);
      fetchUserByEmail(encryptDataService.decryptData(localStorage.getItem('email')));
    }
    else
      navigate('/login');

    // eslint-disable-next-line
  }, []);


  async function writeUserData() {
    try {
      console.log('console');
      await addDoc(LinkCollection, { email: encryptDataService.decryptData(localStorage.getItem('email')), links: accordions });
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }
  const updateLink = async () => {
    try {
      const email = encryptDataService.decryptData(localStorage.getItem('email'));
      if (!email) {
        console.error("No email found in localStorage.");
        return;
      }

      // Query to find the user with the matching email
      const q = query(LinkCollection, where("email", "==", encryptDataService.decryptData(localStorage.getItem('email'))));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first matching document
        const linkDoc = querySnapshot.docs[0];
        const linkRef = doc(db, "LinkCollection", linkDoc.id);

        console.log('Updating document:', linkDoc.id);

        // Update the document with new values
        await updateDoc(linkRef, { links: accordions });
        console.log('Link updated successfully!');
        fetchUserByEmail(encryptDataService.decryptData(localStorage.getItem('email')));
      } else {
        console.log('No matching document found. Creating a new one...');
        writeUserData(); // Ensure this function is properly defined
        fetchUserByEmail(encryptDataService.decryptData(localStorage.getItem('email')));
      }
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };
  function onColorPickerIconClick(index) {
    setDisplayPicker(displayPicker === index ? null : index);
  }
  function onColorPickerClick(selectedColor, index) {
    const updatedAccordions = accordions.map((acc, i) =>
      i === index ? { ...acc, headerBackGroundColor: selectedColor } : acc
    );
    setAccordions(updatedAccordions);
  }


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column', width: '100%' }}>
      {/* <Header headerMessage="Links"
            onIsEditChange={isEditChange} 
        dataCount={accordions.length}/> */}
      {/* <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end', width: '100%'}}> */}
        <LogoutIcon onClick = {()=>{navigate('/login');localStorage.clear()}}sx={{color: 'white', position: 'absolute', right: isEdit==='true' ? '15%' : '17%', top: '9%', cursor:'pointer'}} />
      {/* </div> */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', marginTop: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <h1 style={{ color: 'white' }}>Links</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end', width: isEdit==='true'? '85%':'83%' }}>
            {accordions?.length ? <Button style={{ backgroundColor: 'rgb(0 0 255)', color: 'white', border: '1px solid white' }} variant="outlined" onClick={onButtonClick}>{isEdit==='true' ? 'Save' : 'Edit'}</Button> : <div></div>}
          </div>
        </div>
        </div>
      <div style={{ width: '70%', Height: '80%', display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
        {isLoader && (
  <Stack spacing={-5}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        sx={{
          fontSize: '6rem',
          borderTopRightRadius: '15px',
          borderTopLeftRadius: '15px',
          backgroundColor: 'rgb(38 38 38)', // Or use theme.palette.grey[800]
          '&::after': {
            backgroundImage: 'linear - gradient(90deg, rgba(100 149 237 0.3), rgba(255 255 255 0.4), rgba(100 149 237 0.3))'
          },
        }}
      />
    ))}
  </Stack>
)}
        {accordions.map((accordion, accordionIndex) => (
          <div style={{display:'flex', alignItems:'start', justifyContent:'start', flexDirection:'column', width:'100%', gap:'10px'}}>
            {displayPicker === accordionIndex && <div style={{border:'1px solid white', padding: '10px', display: 'flex', alignItems: 'center', flexDirection: 'row', height: '30px', width: '47%', backgroundColor:'#121212', marginLeft: '5%', borderRadius:'5px', gap:'10px'}}>
              {colors.map((colorItem, index) => (
                <div onClick={() => { onColorPickerClick(colorItem.color, accordionIndex) }} style={{ width: '25px', height: '25px', backgroundColor: colorItem.color, border: ((colorItem.color === accordion.headerBackGroundColor) || (!accordion.headerBackGroundColor && colorItem.color === 'blue')) ? '3px solid white' : '1px solid white', borderRadius:'20%', cursor:'pointer'}}>
                </div>
              ))}
            </div>}
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {/* {displayPicker === accordionIndex && (
              <Box
                sx={{
                  left: '10%',
                  top: '10%',
                  width:'20%',
                  zIndex: 10
                }}
              >
                <SketchPicker
                  color={color}
                  onChangeComplete={handleColorChange}
                />
              </Box>
            )}*/}
            {isEdit === 'true' && <FormatColorFillIcon
              onClick={() => onColorPickerIconClick(accordionIndex)}
              sx={{ color: 'white', cursor: 'pointer', width: '5%', }}
            />} 
            {/* {displayPicker && displayPicker === accordionIndex && (
              <SketchPicker 
              color={color} 
              sx={{ backgroundColor: 'black' }} 
              onChangeComplete={handleColorChange} />
            )}
            {isEdit === 'true' && <FormatColorFillIcon 
            onClick={onColorPickerIconClick(accordionIndex)} 
            sx={{ color: 'white', width: '5%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} />} */}
          <Accordion key={accordionIndex} style={{ marginBottom: '10px', backgroundColor: '#CCD0D8', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', borderRadius: '15px', width:'95%'}} >
                <AccordionSummary style={{ backgroundColor: accordion.headerBackGroundColor ?? 'rgb(0, 0, 255)', color: 'white', border: '1px solid rgba(255, 255, 255, 1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', borderTopRightRadius: '15px', borderTopLeftRadius: '15px', }} 
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls={`panel${accordionIndex}-content`}
              id={`panel${accordionIndex}-header`}
            >
              <div style={{ flex: 1 , paddingLeft: '19px'}}>
                {isEdit === 'true' ? (
                  <TextField
                    type="text"
                    value={accordion.header}
                    sx={customInputProperties}
                    onChange={(e) => handleAccordionHeaderChange(accordionIndex, e)}
                    label="Accordion Header"
                    variant="outlined"
                    fullWidth
                  />
                ) : (
                  <h2 style={{margin:'8px'}}>{accordion.header}</h2>
                )}
              </div>
              {isEdit === 'true' ? 
              (<IconButton sx={{color: 'white'}} onClick={() => handleRemoveAccordion(accordionIndex)} size="small">
                <RemoveCircleOutlineIcon /></IconButton>) :
              (<div></div>)}
            </AccordionSummary>
            <AccordionDetails style={{ padding: '15px 30px', backgroundColor: '#CCD0D8', borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}>
              <div style={ isEdit !== 'true' ? 
              { border: '2px dashed black', flexDirection: 'column', Width: '100%', padding: '20px' } :
               {flexDirection: 'column', Width: '100%', padding: '20px' } }>
              {accordion.content.map((contentItem, contentIndex) => (
                <div key={contentIndex} style={{ display: 'flex', marginBottom: '20px' }}>
                  <div style={{ flex:1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', fontSize: '20px', fontWeight: '600' }}>
                    {isEdit === 'true' ? (
                      <TextField
                        type="text"
                        value={contentItem.name}
                        onChange={(e) =>
                          handleAccordionContentChange(accordionIndex, contentIndex, 'name', e.target.value)
                        }
                        label="Link Name"
                        variant="outlined"
                        fullWidth
                      />
                    ) : (
                      contentItem.name
                    )}
                  </div>
                  <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', marginRight: '10px' }}>
                    {isEdit === 'true' ? (
                      <TextField
                        type="text"
                        value={contentItem.link}
                        onChange={(e) =>
                          handleAccordionContentChange(accordionIndex, contentIndex, 'link', e.target.value)
                        }
                        label="Link URL"
                        variant="outlined"
                        fullWidth
                      />
                    ) : (<Button style={{ backgroundColor: accordion.headerBackGroundColor ?? 'rgb(0, 0, 255)', color: 'white', border: '1px solid rgba(255, 255, 255, 1)' }}variant="contained" onClick={() => { window.open(contentItem.link, "_blank")} }>Navigate </Button>
                    )}
                  </div>
                  {isEdit === 'true' ? (<IconButton
                    onClick={() => handleRemoveContent(accordionIndex, contentIndex)}
                    size="small"
                    style={{ marginLeft: '10px' }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>) : (<div></div>)}
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                {isEdit === 'true' ? 
                (<AddIcon onClick={() => handleAddContent(accordionIndex)} style={{ cursor: 'pointer' }} />) :
                (<div></div>)}
              </div>
              </div>
            </AccordionDetails>
          </Accordion>
          </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'end', paddingTop: '10px' }}>
          {isEdit === 'true' ? 
            (<AddIcon onClick={handleAddAccordion} sx={{ color: 'white' }} style={{ cursor: 'pointer' }} />) :
          (<div></div>)}
          {/* <Box sx={{ textAlign: 'center', marginTop: 5 }}>
            {/* <Button
              variant="contained"
              onClick={() => setDisplayPicker(!displayPicker)}
              sx={{ backgroundColor: color, color: '#000', marginBottom: 2 }}
            >
              Pick Color
            </Button> */}


            {/* <Box
              sx={{
                marginTop: 2,
                width: 100,
                height: 100,
                backgroundColor: color,
                border: '1px solid black',
              }}
            /> 
          </Box> */}
        </div>
      </div>
    </div>
  );
};

export default Greeting;
