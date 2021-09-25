import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination } from '@mui/material'
import TablePaginationActions from './TablePaginationActions'
import PropTypes from 'prop-types'



TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


const ContentTable = ({ data, selectedSmsCount, selectedDedicatedNumberCount }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} className='table-content'>
            <Table aria-label="simple table">
                <TableHead className='table-head'>
                    <TableRow>
                        <TableCell>Gateways</TableCell>
                        <TableCell align='center'>Cost for {selectedDedicatedNumberCount} numbers</TableCell>
                        <TableCell align='center'>Cost for {selectedSmsCount} messages</TableCell>
                        <TableCell align='center'>Total Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length !== 0 ?
                        (rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{row.gateway}</TableCell>
                                {
                                    <TableCell align='center'>
                                        {
                                            row.cost_per_dedicated_number_per_month_usd !== '' ?
                                                `$ ${((parseFloat(row.cost_per_dedicated_number_per_month_usd.toString().replace("$", "")) * selectedDedicatedNumberCount).toFixed(2)).toLocaleString()}`
                                                :
                                                'No dedicated numbers available'
                                        }
                                    </TableCell>
                                }
                                <TableCell align='center'>
                                    {
                                        `$ ${((parseFloat(row.outbound_sms_costs_usd.toString().replace("$", "")) * selectedSmsCount).toFixed(2)).toLocaleString()}`
                                    }
                                </TableCell>
                                <TableCell align='center'>
                                    {parseInt(row.total).toFixed(2).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        )) :
                        <TableRow><TableCell>Data not found!</TableCell></TableRow>
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default ContentTable