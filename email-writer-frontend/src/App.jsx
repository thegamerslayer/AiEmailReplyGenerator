import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import axios, { Axios } from "axios";

import './App.css'
import { useState } from 'react'

function App() {

  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false); // new state for snackbar

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response=await axios.post("http://localhost:8080/api/email/generate",{
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ?
        response.data : JSON.stringify(response.data)
      );
    } catch (error) {
      console.error("Error generating reply:", error);
    }finally{
      setLoading(false)
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true); // show snackbar
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />


        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel >Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>


        <Button variant="contained"
          sx={{ mb: 2 }}
          onClick={handleSubmit}
          disabled={!emailContent || loading}>
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}

        </Button>
      </Box>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generatedReply || ''}
          inputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
        />

        <Button variant='outlined'
          onClick={() => navigator.clipboard.writeText(generatedReply)}
        >
          Copy to Clipboard
        </Button>

      <Snackbar
          open={copied}
          autoHideDuration={2000}
          onClose={() => setCopied(false)}
          message="Copied to clipboard!"
        />


      </Box>
    </Container>
  )
}

export default App
