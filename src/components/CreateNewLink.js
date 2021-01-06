import React, { useEffect, useState } from 'react'
import { createLink, editLink } from '../api'
import Button from '@material-ui/core/Button'

const CreateNewLink = (props) => {
  const {
    addNewLink,
    history,
    activeLink,
    setActiveLink,
    linkList,
    setLinkList,
  } = props

  const [link, setLink] = useState('')
  const [comment, setComment] = useState('')

  const [active, setActive] = useState(false)

  const updateFunc = (updateLink1) => {
    let index = linkList.findIndex((link) => {
      return link.index === updateLink1.index
    })
    if (index > -1) {
      const linkCopy = [...linkList]
      linkCopy[index] = updateLink1
      setLinkList(linkCopy)
    }
  }

  function clearForm() {
    setLink('')
    setComment('')
  }

  useEffect(() => {
    setLink(activeLink.link || '')
    setComment(activeLink.comment || '')

    console.log(activeLink)
  }, [activeLink])

  const handleSubmit = async () => {
    const sendData = {
      link: `http://www.${link}.com`,
      clickcount: 1,
      comment: comment,
    }

    const updateData = {
      linkId: activeLink.id,
      link: link,
      clickcount: activeLink.clickcount,
      comment: comment,
    }

    console.log('The new link data is:', updateData)

    if (!activeLink.id) {
      try {
        console.log("inside the 'new' try, not the 'update' try")
        const { newLink } = await createLink(sendData)
        if (newLink.linkId === undefined) {
          setActive(true)
        }

        addNewLink(newLink)

        console.log('hitting added')

        setActive(false)
        history.push('/')
      } catch (error) {
        throw error
      }
    } else {
      try {
        console.log("inside the 'update' try")
        let result = await editLink(updateData, activeLink.id)
        console.log('this is result', result)
        updateFunc(result.data.rows[0])

        history.push('/')
        clearForm()
        setActive(false)
        setActiveLink({})
      } catch (error) {
        throw error
      }
    }
  }

  return (
    <div>
      {active ? <h5>{link} already exsists</h5> : null}
      <form className="newLinkForm">
        {activeLink.id ? (
          <h3 className="linkComponent">Update Link Info</h3>
        ) : (
          <h3 className="linkComponent">Create a Link</h3>
        )}
        <label className="urlName">URL</label>
        <p className="urlPrefix">http://www.</p>
        <input
          type="text"
          className="linkName"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        ></input>
        <p className="urlSuffix">.com</p>
        <label className="commentLabel">Comment</label>
        <textarea
          type="text"
          className="commentBox"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>

        <div className="buttonGroup">
          <Button
            className="submit"
            variant="contained"
            color="primary"
            onClick={async (event) => {
              event.preventDefault()
              handleSubmit()
            }}
          >
            Submit
          </Button>
          <Button
            className="cancel"
            variant="contained"
            onClick={() => {
              clearForm()
              setActiveLink({})
              history.push('/')
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateNewLink
