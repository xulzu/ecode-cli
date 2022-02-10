const fs = require('fs')
const path = require('path')
const os = require('os')
const chalk = require('chalk')
const package = require('../package.json')

function init(workspace) {
	workspace = workspace || path.join(os.homedir(), 'Desktop/ecode_workspace/')
	fs.mkdir(workspace, { recursive: true }, error => {
		if (error) {
			console.log(chalk.red(`在${workspace}下创建目录失败，请更换目录重试`))
		} else {
			if (!package.ecode_workspaces.all.includes(workspace)) {
				console.log(chalk.green(`成功在${workspace}下创建工作空间2`))
				package.ecode_workspaces.all.push(workspace)
				if (!package.ecode_workspaces.defualt) package.ecode_workspaces.defualt = workspace
				fs.writeFile(path.join(path.resolve(__dirname, '..'), 'package.json'), JSON.stringify(package), error => {
				})
			} else {
				console.log(chalk.green(workspace + '已存在'))
			}
		}
	})
}
module.exports = init