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
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                        <TableCell>Cost for Numbers</TableCell>
                        <TableCell>Cost for Message</TableCell>
                        <TableCell>Country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{row.gateway}</TableCell>
                            {
                                <TableCell>
                                    {
                                        row.cost !== '' ?
                                            `$ ${(row.cost * selectedDedicatedNumberCount).toFixed(2)}`
                                            :
                                            'No dedicated numbers available'
                                    }
                                </TableCell>
                            }
                            <TableCell>
                                {
                                    parseInt(row.volume) !== 0 ?
                                        `$ ${(row.sms * selectedSmsCount * row.volume).toFixed(2)}`
                                        :
                                        `$ ${(row.sms * selectedSmsCount).toFixed(2)}`
                                }
                            </TableCell>
                            <TableCell>{row.country}</TableCell>
                        </TableRow>
                    ))}
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