import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddCategory from '../component/AddCategory';
import AddSubcategory from '../component/AddSubcategory';
import AddProduct from '../component/AddProduct';

function InsertElement() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return(
    <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Insert Category" value="1" />
            <Tab label="Insert SubCategory" value="2" />
            <Tab label="Insert Product" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><AddCategory /></TabPanel>
        <TabPanel value="2"><AddSubcategory/></TabPanel>
        <TabPanel value="3"><AddProduct/></TabPanel>
      </TabContext>
    </Box>
    </>
  );
}
export default InsertElement;


