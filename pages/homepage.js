import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import Breadcrumb from "../components/Breadcrumb";
import PropTypes from "prop-types";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import "../styles/Homepage.module.css";

export default function Homepage() {
  const [items, setItems] = useState("");
  const [filterItems, setFilterItems] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    let config = {
      method: "get",
      url: `/api/data`,
    };
    axios(config)
      .then((result) => {
        console.log("item => ", result.data.data);
        setItems(result.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getUnique = (data, key) => {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  };

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed() + "k"
      : Math.sign(num) * Math.abs(num);
  };

  useEffect(() => {
    items && setFilterItems(getUnique(items.list, (key) => key.customername));
  }, [items]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filterItems.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Container maxWidth="2xl">
        <Breadcrumb
          options={["Business Insight", "Report", "Member"]}
          select="Member"
        />
        <Typography className="title-home">
          Yearly Member 01-Jan-2020 to 31-Dec-2020
        </Typography>

        <div className="root-header">
          <Grid container>
            <Grid item xs={4}>
              <Paper
                className="paper-left"
                style={{ borderRadius: 0, boxShadow: "none", lineHeight: 2 }}
              >
                <div>
                  <span>
                    Total <samp style={{ fontSize: 24 }}>Members:</samp>
                    <span className="result-left">
                      {items && items.summarytier[0].total_members}
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    Total <samp style={{ fontSize: 24 }}>Rev.</samp>
                    <small>(THB)</small>
                    <samp style={{ fontSize: 24 }}>:</samp>
                    <span className="result-left">
                      {items && kFormatter(items.summarytier[0].total_amount)}
                    </span>
                  </span>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper
                className="paper-right"
                style={{ borderRadius: 0, boxShadow: "none", lineHeight: 1.8 }}
              >
                <div style={{ textAlign: "center" }}>
                  <span>{items && items.summarytier[0].tier_name}</span>
                </div>
                <div style={{ fontSize: 14 }}>
                  Total <samp style={{ fontSize: 22 }}>Members:</samp>
                  <span className="result-right">
                    {items && items.summarytier[0].total_members}
                  </span>
                </div>
                <div style={{ fontSize: 14 }}>
                  <span>
                    Total <samp style={{ fontSize: 22 }}>Rev.</samp>
                    <small>(THB)</small>
                    <samp style={{ fontSize: 22 }}>:</samp>
                  </span>
                  <span className="result-right">
                    {items && kFormatter(items.summarytier[0].total_amount)}
                  </span>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <TableContainer component={Paper}>
          <Table
            className="table"
            aria-label="simple table"
            style={{ marginTop: 4 }}
          >
            <TableHead style={{ backgroundColor: "#898989" }}>
              <TableRow>
                <TableCell align="center" className="white-text">
                  Name
                </TableCell>
                <TableCell align="center" className="white-text">
                  ID
                </TableCell>
                <TableCell align="center" className="white-text">
                  Tier
                </TableCell>
                <TableCell align="center" className="white-text">
                  LTV
                </TableCell>
                <TableCell align="center" className="white-text">
                  Total Trans.
                </TableCell>
                <TableCell align="center" className="white-text">
                  Total Point
                </TableCell>
                <TableCell align="center" className="white-text">
                  Remaining Point.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterItems &&
                filterItems.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {item.customername}
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={item.customerphone}
                        displayType={"text"}
                        format="### ### ####"
                      />
                    </TableCell>
                    <TableCell align="center">{item.customertier}</TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={item.totalamount}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                    <TableCell align="right">{item.totaltransaction}</TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={item.totalreward}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={item.remainingpoint}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={filterItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onChangePage } = props;
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: 24 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
