import React from "react";
import {
  Grid
} from '@mui/material';
import RepositoryCard from './RepositoryCard';

const CardList = ({ repositories }) => {
  return (
    <div className="repository-list">
      <Grid container spacing={2}>
        {repositories.map((repo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={repo.id}>
            <RepositoryCard repo={repo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CardList;





