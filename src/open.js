const { execSync, exec } = require('child_process');
const package = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer');
const fs = require('fs')
function open(projectName) {
	if (projectName) {
		openOne(projectName)
	} else {
		openSelected()
	}
}
function openOne(projectName) {
	const workspace = package.workspaces.defualt
	exec(`open ${path.join(workspace, projectName)} -a vscode`, function (error, stout, stderr) {
		if (error) {
			console.log(chalk.red(stderr));
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

		message: '选择要打开的项目',
	}]).then(({ value }) => {
		openOne(value)
	})
}
module.exports = open