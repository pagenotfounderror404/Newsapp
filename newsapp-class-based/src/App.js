import './App.css'

import React, { Component } from 'react'
import { Navbar } from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({ progress: this.progress })
  }
  render() {
    return (
      <Router>
        <LoadingBar height="10px" color="red" progress={this.state.progress} />
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/About"></Route>
          <Route
            exact
            path="/"
            element={<News setProgress={this.setProgress} key="general" />}
          ></Route>
          <Route
            exact
            path="/Business"
            element={
              <News
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
}
