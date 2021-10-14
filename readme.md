# 一个使用命令行辅助工作的 cli，其中使用命令行包含创建工作空间，打开项目，拉取文件到工作空间等基础功能

## 依赖文档

- chalk https://github.com/chalk/chalk
- inquirer https://github.com/SBoudrias/Inquirer.js

## 功能点：

- ecode init [workspace] 在默认路径（默认路劲是桌面）下 或[workspace]下初始化工
  > ecode init 在桌面的 ecode_workspace 文件夹下初始化
  > ecdde init './src/' 在'./src/'下初始化工作空间
- ecode pull [templateName] [rename] 拉取工作空间中添加的远程仓库或者自己填写的远程仓库到工作空间中
  > ecode pull git@gitee:xxxxxxxxx rename 从 git 拉取 git@gitee:xxxxxxxxx 并重命名为 rename
  > ecode pull mytemplate rename 找到 mytemplate 对应的远程并拉取

* ecode ls 列出工作空间中所有文件和目录
* ecode open [project] 用 vscode 打开工作空间中的项目

- ecode 选择要打开的项目

* ecode addRemote <gitURL> <name> 将远程添加到该 cli 中记录
  > ecode addRemote git@gitee:xxxxx mytemplate 将 git@gitee:xxxxx 记录在 cli 中并命名为 mytemplate，方便多次使用

- ecode deleteRemote <name> 将 cli 中记录的名称为 name 的远程给删除
