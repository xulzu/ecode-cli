#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const package = require('../package.json')
const init = require('./init')
const openfile = require('./open')
const ls = require('./ls')
const addRemote = require('./addRemote')
const pull = require('./pull')
const deleteRemote = require('./deleteRemote')
const deleteProject = require('./delete')
const changeSwimline= require('./changeSwimline')
program.version(package.version, '-v, --version', 'output the current version');
program
  .action(() => {
    openfile()
  })

program
  .command('init [workspace]')
  .description('在某个工作空间下初始化')
  .action(init)
program
  .command('pull [templateName] [rename]')
  .description('拉取指定模板')
  .action(pull)
program
  .command('ls')
  .option('-r')
  .description('列出工作区所有文件')
  .action(ls)
program
  .command('addRemote <gitURL> <name>')
  .description('添加指定远程仓库')
  .action(addRemote)
program
  .command('deleteRemote <name>')
  .description('删除指定远程仓库')
  .action(deleteRemote)

program
  .command('open [project]')
  .description('打开工作空间中的${file}项目')
  .action(openfile)
program
  .command('delete [project]')
  .description('删除工作空间中的${file}项目')
  .action(deleteProject)
program
  .command('swim [swimLane]')
  .description('改变泳道')
  .action(changeSwimline)
program.parse(process.argv);


