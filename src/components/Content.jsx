import React, { useState, useEffect } from 'react'
import { Grid, Container, Autocomplete, Typography, Slider, TextField, Box } from '@mui/material'
import { countries, gateways, marks } from '../data'
import ContentTable from './ContentTable'
import axios from 'axios'
var groupBy = require('json-groupby')
const _ = require('lodash')


const Content = () => {

    const [data, setData] = useState(gateways)
    const [selectedSmsCount, setSelectedSmsCount] = useState(100)
    const [selectedDedicatedNumberCount, setSelectedDedicatedNumberCount] = useState(1)
    const [country, setCountry] = useState(null)

    const handlePriceChange = () => {
        let groupedData = groupBy(gateways, ['gateway'])
        let groupedDataToArray = []

        for (let index in groupedData) {
            groupedDataToArray.push(groupedData[index])
        }

        const gatewayData = groupedDataToArray.flatMap(gatewayData => {
            let biggestVolume = -1
            let gatewayCostRecordToUse = []

            for (const gatewayCostRecord of gatewayData) {
                if (selectedSmsCount > gatewayCostRecord.volume && gatewayCostRecord.volume > biggestVolume && gatewayCostRecord.country === country.name) {
                    gatewayCostRecordToUse = {
                        ...gatewayCostRecord, total: (selectedSmsCount * gatewayCostRecord.costPerOutboundSMS
                            + selectedDedicatedNumberCount * parseInt(gatewayCostRecord.costPerDedicatedNumber))
                    }
                    biggestVolume = gatewayCostRecord.volume
                }
            }
            return gatewayCostRecordToUse
        })

        setData(_.orderBy(gatewayData, ['total']))
    }

    // exe only at 1st mount
    useEffect(() => {
        axios.get('https://ipapi.co/json/').then((response) => {
            setCountry({ name: response.data.country_name, code: response.data.country_code })
        }).catch((error) => { setCountry(null) });
    }, [])

    // other changes 
    useEffect(() => {
        country !== null ? handlePriceChange() : setData([]);
    }, [selectedDedicatedNumberCount, selectedSmsCount, country])


    const handleCountryChange = (event, value) => {
        value !== null ? setCountry(value) : setCountry(null)
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
                        value={country}
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
                <Grid item xs={12} md={4}>
                    <Typography>How many numbers do you need?</Typography>
                    <Slider getAriaValueText={(value) => value} marks={marks} step={1} min={1} max={20} value={selectedDedicatedNumberCount} aria-label="Default" onChange={handleNumberChange} valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>How many messages will you send per month?</Typography>
                    <Slider aria-label="Always visible" min={100} max={11000} value={selectedSmsCount} onChange={handleSMSChange} valueLabelDisplay="on" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom>Available Gateways</Typography>
                    <Typography variant='body2'>The following gateways are available in your country:</Typography>
                    <ContentTable data={data} selectedSmsCount={selectedSmsCount} selectedDedicatedNumberCount={selectedDedicatedNumberCount} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Content