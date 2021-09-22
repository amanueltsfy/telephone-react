import React, { useState, useEffect } from 'react'
import { Grid, Container, Autocomplete, Typography, Slider, TextField, Box } from '@mui/material'
import { countries, gateways } from '../data'
import ContentTable from './ContentTable'
var groupBy = require('json-groupby')

const Content = () => {

    const [data, setData] = useState(gateways)
    const [selectedSmsCount, setSelectedSmsCount] = useState(100)
    const [selectedDedicatedNumberCount, setSelectedDedicatedNumberCount] = useState(1)


    const getSortedData = (assocIndex) => {
        return (a, b) => {
            if (a[assocIndex] > b[assocIndex]) {
                return 1;
            } else if (a[assocIndex] < b[assocIndex]) {
                return -1;
            }
            return 0;
        }
    }

    const handlePriceChange = () => {
        let groupedData = groupBy(gateways, ['gateway']) // return object list
        let groupedDataArray = []  // the same as gatewayCostRecordToUse 
        let newPriceIndex = 0   // the default index will be 0, if there are no multiple gateways exists

        // sort out the inner array
        for (let index in groupedData) {
            groupedData[index].sort(getSortedData('volume'))
        }

        for (let index in groupedData) {    // iterate object list

            for (let innerIndex = 0; innerIndex < groupedData[index].length; innerIndex++) {   // the same as flatMap and it grants the selected volume is two consecutive value cuz it is already sorted out

                let currentVolume = groupedData[index][innerIndex].volume
                let nextVolume

                innerIndex === (groupedData[index].length - 1) ?
                    nextVolume = groupedData[index][groupedData[index].length - 1].volume :
                    nextVolume = groupedData[index][innerIndex + 1].volume

                /* 
                    AND condition has a boundary => [ ) 
                    OR condition helps to include whatever the selectedsmsvalue has a value beyond the maximum volume 
                */
                if ((selectedSmsCount >= currentVolume && selectedSmsCount < nextVolume) || selectedSmsCount > nextVolume) {
                    newPriceIndex = innerIndex
                }
            }

            // the same as gatewayCostRecordToUse 
            groupedDataArray.push(
                {
                    gateway: groupedData[index][0].gateway, costPerDedicatedNumber: groupedData[index][0].costPerDedicatedNumber,
                    costPerOutboundSMS: groupedData[index][newPriceIndex].costPerOutboundSMS, country: groupedData[index][0].country
                })
        }

        setData(groupedDataArray)
    }

    useEffect(() => {
        handlePriceChange()
    }, [selectedSmsCount])


    const handleCountryChange = (event, value) => {
        handlePriceChange()
        value !== null ?
            setData(data.filter(item => item.country.includes(value.name)))
            :
            setData(data)
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
                    <Slider min={1} marks max={20} value={selectedDedicatedNumberCount} aria-label="Default" onChange={handleNumberChange} valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>How many messages will you send per month?</Typography>
                    <Slider min={100} max={11000} value={selectedSmsCount} aria-label="Default" onChange={handleSMSChange} valueLabelDisplay="auto" />
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