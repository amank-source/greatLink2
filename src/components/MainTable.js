import React from 'react'
import TableRows from './TableRows'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

const MainTable = (props) => {
  const {
    linkList,
    setLinkList,
    activeLink,
    setActiveLink,
    history,
    setSearch,
  } = props

  const tableStyling = {
    width: '75vw',
    justifyContent: 'center',
    border: '1px solid green',
    margin: 'auto',
    marginTop: '1em',
  }

  return (
    <TableContainer style={tableStyling}>
      <Table className="LinkList">
        <TableHead className="LinkList-head">
          <TableRow>
            <TableCell>
              <h3>URL</h3>
            </TableCell>
            <TableCell>
              <h3>Click Count</h3>
            </TableCell>
            <TableCell>
              <h3>Comment</h3>
            </TableCell>
            <TableCell>
              <h3>Actions</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {linkList.map((link, index) => {
            return (
              <TableRow key={index}>
                <TableRows
                  id={link.id}
                  link={link.link}
                  clickCount={link.clickcount}
                  comment={link.comment}
                  dateCreated={link.dateCreated}
                  setLinkList={setLinkList}
                  linkList={linkList}
                  setLinkList={setLinkList}
                  id={link.id}
                  index={index}
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                  history={history}
                  setSearch={setSearch}
                />
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MainTable
