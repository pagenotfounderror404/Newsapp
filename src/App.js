import './App.css'

import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from '../../newsapp/src/Components/News'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress, setProgress] = useState(0)
  return (
    <Router>
      <LoadingBar height="5px" color="red" progress={progress} />
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route exact path="/About"></Route>
        <Route
          exact
          path="/"
          element={<News setProgress={setProgress} key="general" />}
        ></Route>
        <Route
          exact
          path="/Business"
          element={
            <News
              setProgress={setProgress}
              country="in"
              category="business"
              key="business"
            />
          }
        ></Route>
        <Route
          exact
          path="/Science"
          element={
            <News
              setProgress={setProgress}
              country="in"
              category="science"
              key="science"
            />
          }
        ></Route>
        <Route
          exact
          path="/Sports"
          element={
            <News
              setProgress={setProgress}
              country="in"
              category="sports"
              key="sports"
            />
          }
        ></Route>
        <Route
          exact
          path="/Technology"
          element={
            <News
              setProgress={setProgress}
              country="in"
              category="technology"
              key="technology"
            />
          }
        ></Route>
        <Route
          exact
          path="/General"
          element={
            <News
              setProgress={setProgress}
              country="in"
              category="general"
              key="general"
            />
          }
        ></Route>
        <Route
          exact
          path="/Entertainment"
          element={
            <News
              setProgress={setProgress}
              country="in"
              category="entertainment"
              key="entertainment"
            />
          }
        ></Route>
        <Route
          exact
          path="/Health"
          element={
            <News
              setProgress={setProgress}
              country="in"
              category="health"
              key="health"
            />
          }
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
