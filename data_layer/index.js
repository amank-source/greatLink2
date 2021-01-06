const sync = require('./sync')
const client = require('./client')

async function getAllLinks() {
  try {
    const { rows: allLinks } = await client.query(`
      SELECT *
      FROM links;
    
    `)

    return allLinks
  } catch (error) {
    throw error
  }
}

const createLink = async ({ link, comment, clickcount }) => {
  try {
    const {
      rows: [newLink],
    } = await client.query(
      `
      INSERT INTO links (link, comment, clickcount)
      VALUES($1, $2, $3)
      RETURNING *;
    `,
      [link, comment, clickcount],
    )
    link.dateCreated = new Date()
    return newLink
  } catch (error) {
    throw error
  }
}

const getLinkById = async (id) => {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    SELECT * 
    FROM links
    WHERE id=$1;
    `,
      [id],
    )
    if (!link) {
      return 'No link was found with that id'
    }

    return link
  } catch (error) {
    console.error(error)
  }
}

const updateLink = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(', ')

  try {
    if (setString.length > 0) {
      const result = await client.query(
        `
      UPDATE links
      SET ${setString}
      WHERE id=$1
      RETURNING *;
      `,
        [id, ...Object.values(fields)],
      )

      return result
    }
  } catch (error) {
    throw error
  }
}

async function updateTag(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ')

  if (setString.length === 0) {
    return
  }

  try {
    const {
      rows: [tag],
    } = await client.query(
      `
        UPDATE tags
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields),
    )

    return tag
  } catch (error) {
    throw error
  }
}

const deleteLink = async (id) => {
  try {
    const {
      rows: [delLink],
    } = await client.query(
      `
    DELETE FROM links
    WHERE id= $1;
    `,
      [id],
    )
    return 'Link is deleted '
  } catch (error) {
    throw error
  }
}

module.exports = {
  sync,
  client,
  getAllLinks,
  createLink,
  getLinkById,
  updateLink,
  deleteLink,
}
