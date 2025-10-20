import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ mt: 2 }}>{children}</Box> : null
}

export default function Registration() {
  const [tabIndex, setTabIndex] = useState(0)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({
    email: '',
    nom: '',
    prenom: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

  const handleTabChange = (_, newValue) =>{
    setTabIndex(newValue)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    navigate('/app')
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    navigate('/app')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: 400,
          borderRadius: 3,
          bgcolor: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="white">
          HARD DRIVE
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 3,
            '.MuiTab-root': { color: 'white', fontWeight: 'bold' },
            '.MuiTabs-indicator': { backgroundColor: 'white' },
          }}
        >
          <Tab label="Se connecter" />
          <Tab label="S'inscrire" />
        </Tabs>

        {/* Login */}
        <TabPanel value={tabIndex} index={0}>
          <form onSubmit={handleLoginSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
                fullWidth
                variant="filled"
                InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.3)', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
              />
              <TextField
                label="Mot de passe"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
                fullWidth
                variant="filled"
                InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.3)', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Se connecter
              </Button>
            </Stack>
          </form>
        </TabPanel>

        {/* Sign Up */}
        <TabPanel value={tabIndex} index={1}>
          <form onSubmit={handleSignupSubmit}>
            <Stack spacing={2}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                        label="Nom"
                        type="text"
                        value={signupData.nom}
                        onChange={(e) =>
                        setSignupData({ ...signupData, nom: e.target.value })
                        }
                        required
                        fullWidth
                        variant="filled"
                        InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.3)', color: 'white' } }}
                        InputLabelProps={{ sx: { color: 'white' } }}
                    />
                    <TextField
                        label="Prénom"
                        type="text"
                        value={signupData.prenom}
                        onChange={(e) =>
                        setSignupData({ ...signupData, prenom: e.target.value })
                        }
                        required
                        fullWidth
                        variant="filled"
                        InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.3)', color: 'white' } }}
                        InputLabelProps={{ sx: { color: 'white' } }}
                    />
                </Box>
              <TextField
                label="Email"
                type="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
                fullWidth
                variant="filled"
                InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.3)', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
              />
              <TextField
                label="Mot de passe"
                type="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
                fullWidth
                variant="filled"
                InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.3)', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
              />
              <TextField
                label="Confirmer le mot de passe"
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({ ...signupData, confirmPassword: e.target.value })
                }
                required
                fullWidth
                variant="filled"
                InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.3)', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="secondary" 
                fullWidth
                sx ={{ backgroundColor: "#ff4081", '&:hover': { backgroundColor: '#f50057' } }}
                >
                S'inscrire
              </Button>
            </Stack>
          </form>
        </TabPanel>
      </Paper>
    </Box>
  )
}
