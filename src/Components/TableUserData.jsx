import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

export default function TableUserData({ data }) {
  const { theme } = useContext(ThemeContext);
  let cellStyle = { color: theme.color, textAlign: "center" };

  return (
    <div className="table">
      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>WPM</TableCell>
              <TableCell style={cellStyle}>Accuracy</TableCell>
              <TableCell style={cellStyle}>Characters</TableCell>
              <TableCell style={cellStyle}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              data.map((doc) => {
                return (
                  <TableRow>
                    <TableCell style={cellStyle}>{doc.wpm}</TableCell>
                    <TableCell style={cellStyle}>{doc.accuracy}</TableCell>
                    <TableCell style={cellStyle}>{doc.characters}</TableCell>
                    <TableCell style={cellStyle}>
                      {doc.Timestamp.toDate().toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              }) //data consist of array of  document(in object format) and each document has 4 keys
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
