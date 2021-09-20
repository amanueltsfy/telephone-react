import React, { useState } from 'react'
import { Grid, Container, Autocomplete, Typography, Slider, TextField, Box } from '@mui/material'
import { countries, gateways } from '../data'
import ContentTable from './ContentTable'

const Content = () => {

    const [data, setData] = useState(gateways)
    const [selectedSmsCount, setSelectedSmsCount] = useState(100)
    const [selectedDedicatedNumberCount, setSelectedDedicatedNumberCount] = useState(1)

    const handleCountryChange = (event, value) => {
        value !== null ?
            setData(gateways.filter(item => item.country.includes(value.name)))
            :
            setData(gateways)
    }

    const handleNumberChange = (event, value) => {
        setSelectedDedicatedNumberCount(value);
    }

    const handleSMSChange = (event, value) => {
        setSelectedSmsCount(value)
    }

    return (
        <Container className='content'>
            <Grid container justifyContent='space-between' spacing={4}>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        id="country-select-demo"
                        options={countries}
                        autoHighlight
                        onChange={handleCountryChange}
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
                    <Slider min={1} marks max={20} defaultValue={selectedDedicatedNumberCount} aria-label="Default" onChange={handleNumberChange} valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>How many messages will you send per month?</Typography>
                    <Slider min={100} max={11000} defaultValue={selectedSmsCount} aria-label="Default" onChange={handleSMSChange} valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom>Available Gateways</Typography>
                    <Typography variant='body2'>The following gateways ara available in your country:</Typography>
                    <ContentTable data={data} selectedSmsCount={selectedSmsCount} selectedDedicatedNumberCount={selectedDedicatedNumberCount} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Content