import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Stack, Box} from "@mui/system";
import Medal from '../assets/medal_1stplace.png?react';
import Button from "../components/Button.jsx";

function createData(first, name, score) {
    return { first, name, score };
  }
  
  const rows = [
    createData(<img src={Medal}/>, 'Vi', 1284572),
    createData('', 'Jinx', 1254101),
    createData('', 'Mel', 1233943),
    createData('', 'Jayce', 1223218),
    createData('', 'Viktor', 802564),
    createData('', 'Heimerdinger', 652354),
    createData('', 'Powder', 451312),
    createData('', 'Sky', 1243),
  ];

const Score = ({}) => { 

    return (
        <Stack sx={{maxHeight: 400, padding: 10}}>
            <Box sx={{}}><h1>Scoreboard</h1></Box>
            <TableContainer sx={{ minWidth: 450, maxWidth: 650 }}>
                <Table aria-label="scoreboard-table" sx={{[`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                            fontFamily: 'Bungee',
                            color: 'white',
                            }}}>
                    <TableHead sx={{[`& .${tableCellClasses.root}`]: {
                            fontSize: '1.5rem',
                            }
                            }}>
                        <TableRow>
                            <TableCell align="center">Winner</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 },
                            [`& .${tableCellClasses.root}`]: {
                                fontSize: '1.2rem',
                                } }}
                            >
                            <TableCell align="center">{row.first}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">{new Intl.NumberFormat('nb-NO', {
                    }).format(row.score)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
        
    )
}

export default Score;