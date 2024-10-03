import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import inventImage from '../../assets/img/invent.jpg'; // Importe a imagem aqui

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ffc500',
    },
  },
});

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null); // Estado para o erro

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      name: data.get('name'),
      password: data.get('password'),
    };

    console.log('Submitting login with credentials:', credentials);

    try {
      const response = await axios.post('http:///api/users/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('API response:', response);

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/home');
      } else {
        console.error('Authentication failed: No token returned');
        setError('Falha na autenticação: token não retornado.');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setError('Nome de usuário ou senha incorretos.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container spacing={0} alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={false}
          md={6}
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundImage: `url(${inventImage})`, // Use a imagem importada aqui
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            {/* Conteúdo opcional */}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Login"
                name="name"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>} 
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Lembrar"
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: '27rem', padding: '10px' }}
              >
                Entrar
              </Button> 
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
