import { useEffect, useState, Suspense } from 'react'
import Gallery from './Gallery'
import SearchBar from './SearchBar'
import { createResource as fetchData } from './helper'


const App = () => {
  let [searchTerm, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)




  useEffect(() => {
    if (searchTerm) {
        setData(fetchData(searchTerm))
    }
}, [searchTerm])

const renderGallery = () => {
    if(data) {
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
}


  const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
  }

  return (
    <div style={{background:'black', color:'white', fontSize:'25px', flex:1, textAlign:'center'}}>
        <SearchBar handleSearch={handleSearch} />
        {message}
        {renderGallery()}
    </div>
)


}

export default App
