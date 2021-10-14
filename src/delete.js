const { execSync, exec } = require('child_process');
const package = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer');
function deleteProject(projectName) {
	if (projectName) {
		deleteItem(projectName)
	} else {
		openSelected()
	}
}
function deleteItem(projectName) {
	const workspace = package.workspaces.defualt
	exec(`rm -rf ${path.join(workspace, projectName)} `, function (error, stout, stderr) {
		if (error) {
			console.log(chalk.red(stderr));
		} else {
			console.log(chalk.green('删除', projectName, '成功'))
		}
	})
}
function openSelected() {
	const workspace = package.workspaces.defualt
	const allProject = execSync(`ls ${workspace}`).toString().split('\n').filter(item => !!item)
	inquirer.prompt([{
		type: 'list',
		choices: allProject || [],
		pageSize: 20,
		name: 'value',

		message: '选择要删除的项目',
	}]).then(({ value }) => {
		deleteItem(value)
	})
}
module.exports = deleteProject