const { execSync, exec } = require('child_process');
const package = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer');
const fs = require('fs')
const ls = require('./ls')
const workspace = package.workspaces.defualt
function pull(templateName, rename) {
	if (!templateName) {
		inquirer.prompt([
			{
				type: 'list',
				choices: Object.entries(package.remotes).map(([name, value]) => ({
					name: name + ' ' + value, value: { name, value }
				})),
				name: 'value',
				message: '选择要下载的模板'
			}
		]).then((res) => {
			const { name, value } = res.value
			const DirSeen = fs.readdirSync(workspace)
			let fileName = DirSeen.includes(name) ? (name + Date.now()) : name
			pullTemplate(value, fileName)
		})
	} else if (/^https:\/\/|git@.*/.test(templateName)) {
		pullTemplate(templateName, rename)
	} else {
		let url = package.remotes[templateName]
		pullTemplate(url, rename)
	}
}
function pullTemplate(url, rename = '') {
	const subProcess = exec(`git clone ${url} ${rename}`, { cwd: workspace }, (erro, stdout, stderror) => {
		if (erro) {
			console.log(chalk.red(stderror));
		} else {
			console.log(chalk.green(url + ' ' + (rename || '') + '下载成功'));
			ls()
		}
	})
}
module.exports = pull