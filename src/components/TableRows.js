import React, { useEffect, useState, Fragment } from 'react'

import TableCell from '@material-ui/core/TableCell'
import { deleteLink, getLinks, editLink, increaseCountClicker } from '../api'
import Button from '@material-ui/core/Button'
import axios from 'axios'
const BASE_URL = 'api'

const TableRows = (props) => {
  const {
    link,
    clickCount,
    comment,
    linkList,
    id,
    index,
    setLinkList,
    activeLink,
    setActiveLink,
    history,
  } = props

  useEffect(async () => {
    setLinkList([...linkList])
  }, [setLinkList])

  const increaseCount = async () => {
    let newClickCount = clickCount + 1

    const sendData = {
      clickcount: newClickCount,
    }

    try {
      let result = await axios.patch(`${BASE_URL}/links/${id}`, sendData)

      let updatedList = linkList.slice()
      updatedList.splice(index, 1, result.data.rows[0])
      setLinkList(updatedList)
    } catch (error) {
      throw error
    }
  }

  return (
    <Fragment>
      <TableCell
        component="th"
        scope="row"
        onClick={() => {
          increaseCount()
        }}
      >
        <a href={link} target="_blank">
          {link}
        </a>
      </TableCell>
      <TableCell value={clickCount}>{clickCount}</TableCell>
      <TableCell>{comment}</TableCell>

      <TableCell>
        <Button
          className="UpdateInfo"
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setActiveLink({ id, link, comment })
            history.push('/createLink')
          }}
        >
          Update
        </Button>
        <Button
          className="UpdateInfo"
          variant="contained"
          color="primary"
          style={{ margin: '3px' }}
          size="small"
          onClick={async () => {
            try {
              let del = await deleteLink(id)
              let result = linkList.filter((link) => link.id !== id)
              setLinkList(result)
            } catch (error) {
              console.error(error)
            }
          }}
        >
          Delete
        </Button>
      </TableCell>
    </Fragment>
  )
}

export default TableRows
