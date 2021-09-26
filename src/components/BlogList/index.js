import {Component} from 'react'
import {async} from 'rxjs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {
    blogList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogListData()
  }

  getBlogListData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachObj => ({
      author: eachObj.author,
      avatarUrl: eachObj.avatar_url,
      id: eachObj.id,
      imageUrl: eachObj.image_url,
      title: eachObj.title,
    }))
    this.setState({blogList: updatedData, isLoading: false})
  }

  render() {
    const {blogList, isLoading} = this.state
    return (
      <div className="blogList-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogList.map(eachBlog => (
              <BlogItem key={eachBlog.id} blogItemDetails={eachBlog} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
