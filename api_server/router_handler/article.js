// 设备的处理函数模块
const path = require('path')
const db = require('../db/index')

// 发布设备的处理函数
exports.addArticle = (req, res) => {
  console.log(req.file)
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('设备封面是必选参数！')

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理设备的信息对象
  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 设备封面的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 设备的发布时间
    pub_date: new Date(),
    // 设备作者的Id
    author_id: req.user.id,
  }

  const sql = `insert into ev_articles set ?`
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布新设备失败！')
    res.cc('发布设备成功！', 0)
  })
}
