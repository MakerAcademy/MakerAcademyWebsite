import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { DAI_BUDGET, MKR_TOTAL, VESTING_DETAILS } from "./dummyData";

const Budget = () => {
  return <div>Coming Soon</div>;
  return (
    <Box>
      <Grid container spacing={5}>
        {/* Left side- DAI Budget */}
        <Grid item xs={12} lg={5}>
          <Typography sx={{ mb: 3 }}>DAI Budget</Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }}>
              <TableHead>
                <TableRow>
                  {DAI_BUDGET.headers.map((hdr, i) => (
                    <TableCell align={hdr.align || "left"} key={i}>
                      {hdr.title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {DAI_BUDGET.data.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="center">{row.monthly_cost}</TableCell>
                    <TableCell align="center">{row.quarterly}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right Side - MKR Budget */}
        <Grid item xs={12} lg={7}>
          <Typography sx={{ mb: 3 }}>MKR Budget</Typography>

          <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
            {/* Vesting Details Table */}
            <TableContainer component={Paper}>
              <Typography sx={{ p: 2 }}>Vesting Details</Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    {VESTING_DETAILS.headers.map((hdr, i) => (
                      <TableCell align={hdr.align || "left"} key={i}>
                        {hdr.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {VESTING_DETAILS.data.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* MKR Total Table */}
            <TableContainer component={Paper}>
              <Typography sx={{ p: 2 }}>MKR Total</Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    {MKR_TOTAL.headers.map((hdr, i) => (
                      <TableCell align={hdr.align || "left"} key={i}>
                        {hdr.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {MKR_TOTAL.data.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="center">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Budget;
