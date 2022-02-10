const { execSync, exec } = require('child_process');
const package = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const { AutoComplete } = require('enquirer');
const fs = require('fs')
const ls = require('./ls')
const workspace = package.ecode_workspaces.defualt
function pull(templateName, rename) {
	if (!templateName) {
		const prompt = new AutoComplete({
			name: 'value',
			message: '选择要下载的模板',
			limit: 10,
			choices: Object.keys(package.remotes)
		});
		prompt.run()
			.then((name) => {
				const url = package.remotes[name]
				const DirSeen = fs.readdirSync(workspace)
				let fileName = DirSeen.includes(name) ? (name + Date.now()) : name
				pullTemplate(url, fileName)
			})
			.catch(console.error);
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