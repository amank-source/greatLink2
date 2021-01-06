const express = require('express')
const apiRouter = express.Router()

const {
  client,
  createLink,
  getAllLinks,
  getLinkById,
  updateLink,
  deleteLink,
} = require('../data_layer')

apiRouter.get('/api/links', async (req, res) => {
  try {
    const allLinks = await getAllLinks()
    res.send(allLinks)
  } catch (error) {
    throw error
  }
})

apiRouter.get('/api/links/:id', async (req, res) => {
  try {
    const { id } = req.params

    const linkReq = await getLinkById(id)

    res.send(linkReq)
  } catch (error) {
    throw error
  }
})

apiRouter.post('/api/links', async (req, res) => {
  try {
    const { link, comment } = req.body

    const newLink = await createLink(req.body)

    res.send({ newLink })
  } catch (error) {
    throw error
  }
})

apiRouter.patch('/api/links/:linkId', async (req, res) => {
  try {
    const { linkId } = req.params
    const { comment, clickcount } = req.body

    const updateFields = {}
    let updateTheLink = false

    if (typeof comment === 'string') {
      updateTheLink = true
      updateFields.comment = comment.trim()
    }
    if (typeof clickcount === 'number' && clickcount >= 0) {
      updateTheLink = true
      updateFields.clickcount = clickcount
    }

    if (updateTheLink) {
      const updatedLink = await updateLink(linkId, updateFields)
      console.log(updatedLink)
      res.send(updatedLink)
    }
  } catch (error) {
    throw error
  }
})

apiRouter.delete('/api/links/:id', async (req, res) => {
  try {
    const del = await deleteLink(req.params.id)
    res.send('link is deleted')
  } catch (error) {
    throw error
  }
})

module.exports = apiRouter
