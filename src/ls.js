const { exec } = require('child_process');
const package = require('../package.json')
const chalk = require('chalk')
function ls(options) {
	const workspace = package.workspaces.defualt
	// 展示仓库中的远程地址
	if (options && options.r) {
		for (let [key, value] of Object.entries(package.remotes)) {
			console.log(chalk.green(key, ':', value));
		}
		return
	}
	exec(`ls ${workspace}`, function (error, stdout, stderror) {
		if (error) {
			console.log(chalk.red(stderror));
		} else {
			console.log(chalk.yellow('工作空间中所有项目'))
			console.log(chalk.green(stdout))
		}
	})
}
module.exports = ls