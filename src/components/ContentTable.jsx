import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { gateways } from '../data'


const ContentTable = () => {

    return (
        <TableContainer component={Paper} className='table-content'>
            <Table aria-label="simple table">
                <TableHead className='table-head'>
                    <TableRow>
                        <TableCell>Gateways</TableCell>
                        <TableCell>Cost for Numbers</TableCell>
                        <TableCell>Cost for Message</TableCell>
                        <TableCell>Country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gateways.map((row) => (
                        <TableRow key={row.gateway}>
                            <TableCell component="th" scope="row">{row.gateway}</TableCell>
                            <TableCell>{row.cost}</TableCell>
                            <TableCell>{row.sms}</TableCell>
                            <TableCell>{row.country}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ContentTable