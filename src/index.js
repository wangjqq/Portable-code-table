import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  // 初始化状态
  state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发' },
      { id: 2, name: 'rose', content: '板凳' },
      { id: 3, name: 'tom', content: '楼主好人' }
    ],
    // 评论人
    userName: '',
    // 评论内容
    userContent: ''
  }
  // 渲染评论列表:
  // const{comments}=this.state 这个就让comments等于this.state了

  renderList() {
    const { comments } = this.state
    if (this.state.comments.length === 0) {
      return <div className='no-comment'>暂无评论,快去评论吧~</div>
    }
    return (
      <ul>
        {
          comments.map(item => (
            <li key={item.id}>
              <h3>评论人:{item.name}</h3>
              <p>评论内容:{item.content}</p>
            </li>
          ))}
      </ul>
    )
  }

  // 处理表单元素值
  handleFrom = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  // 发表评论 
  addComment = () => {
    const { comments, userName, userContent } = this.state //从state中解构出来 注意this指向

    // 非空校验
    if (userName.trim() === '' || userContent.trim() === '') {
      alert('请输入评论人和评论内容')
      return
    }
    // console.log(userName, userContent)
    // 将评论信息添加到state中
    const newComments = [{
      id: Math.random(),
      name: userName,
      content: userContent
    }, ...comments
    ]
    // 文本框的值如何清空?  要清空文本框只需要将其对应的state清空即可
    // console.log(newComments)
    this.setState({
      comments: newComments,
      userName: '',
      userContent: ''
    })
  }

  render() {
    const { userName, userContent } = this.state
    return (
      <div className='app'>
        <div>
          <input className='user' type="text" placeholder="请输入评论人" value={userName} name="userName" onChange={this.handleFrom}></input>
          <br />
          <textarea className='content' cols="30" rows="10" placeholder="请输入评论内容" value={userContent} name="userContent" onChange={this.handleFrom} />
          <br />
          <button onClick={this.addComment}>发表评论</button>
        </div>

        {/* 通过条件渲染决定渲染什么内容 */}
        {this.renderList()}

      </div>
    )
  }
}

//渲染组件
ReactDOM.render(<App />, document.getElementById('root'))