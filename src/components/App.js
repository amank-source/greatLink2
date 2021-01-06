import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Link,
} from 'react-router-dom'
import { getLinks, increaseCountClicker } from '../api'
import SearchBar from './SearchBar'
import MainTable from './MainTable'
import CreateNewLink from './CreateNewLink'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './App.css'

const App = () => {
  const [linkList, setLinkList] = useState([])

  const [search, setSearch] = useState('')
  const [searchOption, setSearchOption] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [activeLink, setActiveLink] = useState({})

  function addNewLink(newLink) {
    setLinkList([newLink, ...linkList])
  }

  const history = useHistory()

  useEffect(async () => {
    const allLinks = await getLinks()
    let sortedList = allLinks.sort((a, b) =>
      a.clickcount > b.clickcount ? -1 : 1,
    )
    setLinkList(sortedList)
  }, [])

  function filteredLinks() {
    return linkList.filter((_link) => {
      return _link.link.includes(search.toLowerCase())
    })
  }

  console.log('The activeLink is:', activeLink)

  return (
    <>
      <header className="header-app">
        <h1>The Great Linkerator</h1>
        <h3>The ONLY solution for indexing URLs</h3>
      </header>
      <Switch>
        <Route exact path="/CreateLink">
          <CreateNewLink
            addNewLink={addNewLink}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            history={history}
            linkList={linkList}
            setLinkList={setLinkList}
          />
        </Route>
        <Route path="/">
          <SearchBar
            search={search}
            setSearch={setSearch}
            setSearchOption={setSearchOption}
            searchOption={searchOption}
            sortOption={sortOption}
            setSortOption={setSortOption}
            linkList={linkList}
            setLinkList={setLinkList}
          />
          <Grid container justify="center">
            <Button className="createLink" variant="contained" color="primary">
              <Link to="/CreateLink" className="createLink">
                Create Link
              </Link>
            </Button>
          </Grid>
          <MainTable
            linkList={filteredLinks()}
            setSearch={setSearch}
            setLinkList={setLinkList}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            history={history}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App
