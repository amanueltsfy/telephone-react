import React from 'react'
import { Grid, Container, Autocomplete, Typography, Slider, TextField, Box } from '@mui/material'
import { countries } from '../data'
import ContentTable from './ContentTable'

const Content = () => {


    return (
        <Container className='content'>
            <Grid container justifyContent='space-between' spacing={4}>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        id="country-select-demo"
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    alt=""
                                />
                                {option.name} ({option.code})
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a country"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography>How many numbers do you need?</Typography>
                    <Slider min={0} marks max={20} defaultValue={10} aria-label="Default" valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>How many messages will you send per month?</Typography>
                    <Slider min={100} max={11000} defaultValue={2563} aria-label="Default" valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom>Available Gateways</Typography>
                    <Typography variant='body2'>The following gateways ara available in your country:</Typography>
                    <ContentTable />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Content