import React, { useState } from 'react'
import { Grid, Container, Autocomplete, Typography, Slider, TextField, Box } from '@mui/material'
import { countries, gateways } from '../data'
import ContentTable from './ContentTable'

const getFilteredData = (data, sms = false) => {
    let temp = []
    if (!sms) {
        for (let i = 0; i < data.length; i++) {
            temp.push(data[i].cost)
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            temp.push(data[i].sms)
        }
    }

    return temp
}


const Content = () => {

    const [data, setData] = useState(gateways)
    const [filteredData, setFilteredData] = useState(getFilteredData(gateways))

    const handleCountryChange = (event, value) => {
        let temp = gateways.filter(item => item.country.includes(value.name))
        value !== null ?
            setData(temp)
            :
            setData(gateways)

        setFilteredData(getFilteredData(temp))
    }

    const handelNumberChange = (e, v) => {
        setData(data.map((item, index) => {
            item.cost = v * filteredData[index]
            return item
        }))
    }

    const handelSMSChange = (e, v) => {
        setData(data.map((item, index) => {
            item.sms = v * filteredData[index]
            return item
        }))
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
                    <Slider min={1} marks max={20} defaultValue={1} aria-label="Default" onChange={handelNumberChange} valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>How many messages will you send per month?</Typography>
                    <Slider min={100} max={11000} defaultValue={100} aria-label="Default" onChange={handelSMSChange} valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom>Available Gateways</Typography>
                    <Typography variant='body2'>The following gateways ara available in your country:</Typography>
                    <ContentTable data={data} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Content