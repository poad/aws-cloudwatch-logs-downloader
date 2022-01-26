import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AppBar, Box, Divider, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type Props = {
  children: ReactNode
  title?: string
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState(open);
      };


  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          {
            href: '/',
            text: 'Home',
          },
          {
            href: '/about',
            text: 'About',
          },
        ].map((item) => (
          <Link href={item.href} key={item.text} passHref>
            <ListItem button key={item.text}>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  AWS CloudWatch Logs Downloder
                </Typography>
              </Toolbar>
            </AppBar>
          </ThemeProvider>
        </Box>

        <Drawer
          anchor='left'
          open={state}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </header>
      {children}
      <footer>
        <hr />
      </footer>
    </div>
  );
};

export default Layout;
