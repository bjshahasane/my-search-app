import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Pagination,
  Box,
  Container,
  Alert,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CardList from './CardList';
import LoadingSpinner from '../loader';

const theme = createTheme({
  headerStyle:{
    color:"teal",
    boxShadow:"0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);",
  },
  boxStyle: {
    minWidth: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  containerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    m: 3
  },
  buttonStyle: {
    m: 3,
    backgroundColor: "teal",
    color: "#dcdcdc"
  },
  colorTeal: {
    color: "teal"
  }
});


const HeaderList = () => {

  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [sortBy, setSortBy] = useState('stars');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false);

  const perPage = 30;

  // useEffect(() => {
  //   handleSearch();

  //   // eslint-disable-next-line
  // }, [sortBy, page]);


  const handleSearch = async () => {
    setIsLoading(true);
    setShowAlert(false);
    try {
      const apiUrl = `https://api.github.com/search/repositories?q=${query}&sort=${sortBy}&order=desc&per_page=${perPage}&page=${page}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRepositories(data.items);
      setTotalPages(Math.ceil(data.total_count / perPage));
      setIsLoading(false);
    } catch (error) {
      setShowAlert(true)
      console.error('Error fetching data:', error);
      setIsLoading(false)
    }
  };

  const handlePageChange = (e, newPage) => {
    console.log(e.target);
    setPage(newPage);
  };

  useEffect(() => {
    if (query) {
      handleSearch(); // Trigger the API call when sortBy or page changes.
    }

    // eslint-disable-next-line
  }, [sortBy, page]);

  console.log("this is rep", repositories, page);


  return (
    <div>
      {
        isLoading && (
          <LoadingSpinner />
        )
      }
      {
        showAlert && (
          <Alert variant="filled" sx={{ mt: 1 }} onClose={() => { setShowAlert(false) }} severity="error">
            Some error occured
          </Alert>
        )
      }
      <Typography variant='h3' sx={theme.headerStyle}>Github Repository Search</Typography>
      <Box sx={theme.boxStyle}>
        <Container sx={theme.containerStyle}>
          <TextField
            label="Search for repositories"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button variant="contained" sx={theme.buttonStyle} onClick={handleSearch} disabled={query ? false : true}>
            Search
          </Button>
        </Container>


        <FormControl >
          <InputLabel id="sortby-label">Sort By</InputLabel>
          <Select labelId="sortby-label" value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
            <MenuItem value="stars">Stars</MenuItem>
            <MenuItem value="watchers_count">Watchers</MenuItem>
            <MenuItem value="score">Score</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="created_at">Created</MenuItem>
            <MenuItem value="updated_at">Updated</MenuItem>
          </Select>
        </FormControl>
      </Box>






      <CardList repositories={repositories} />
      {
        repositories && repositories.length > 0 && (
          <div className="pagination">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={theme.colorTeal}
            />
          </div>
        )
      }

    </div>

  )
}

export default HeaderList;