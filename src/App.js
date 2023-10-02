import './App.css';
import { useState, Suspense, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ArtistView from './ArtistView'
import AlbumView from './AlbumView'
import Gallery from './Gallery'
import SearchBar from './SearchBar'
import Spinner from './Spinner'
import { DataContext } from './DataContext'
import { SearchContext } from './SearchContext'
import { createResource as fetchData } from './helper'

const App = () => {
  let searchInput = useRef('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')

  const handleSearch = (e, term) => {
    e.preventDefault()
    setData(fetchData(term, 'main'))
  }

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery />
        </Suspense>
      )
    }
  }

  return (
    <div style={{background:'black', color:'white', fontSize:'25px', flex:1, textAlign:'center'}}>
      {message}
      <Router>
        <Routes>

        <Route exact path={'/'}>
          
          <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
            <SearchBar />
          </SearchContext.Provider>
            <DataContext.Provider value={data}>
              {renderGallery()}
            </DataContext.Provider>
            
        </Route>

        <Route path="/album/:id">
            
          <AlbumView />
          
        </Route>

        <Route path="/artist/:id">
            
          <ArtistView />
          
        </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
