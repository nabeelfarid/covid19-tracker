import { Tooltip, AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';

export const AppHeaderBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">COVID-19 Tracker</Typography>
        <div style={{ marginLeft: "auto" }}>
          <Tooltip title="Github Source">
            <IconButton color="inherit" href="https://github.com/nabeelfarid/covid19-tracker" target="_blank" rel="noopener noreferrer">
              <GitHubIcon></GitHubIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Covid-19 API Source">
            <IconButton color="inherit" href="https://corona.lmao.ninja/" target="_blank" rel="noopener noreferrer">
              <SettingsIcon></SettingsIcon>
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>

    </AppBar>
  );
};
