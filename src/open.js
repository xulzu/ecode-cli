const { execSync, exec } = require('child_process');
const package = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const { AutoComplete } = require('enquirer');

function open(projectName) {
	if (projectName) {
		openOne(projectName)
	} else {
		openSelected()
	}
}
function openOne(projectName) {
	const workspace = package.ecode_workspaces.defualt
	exec(`open ${path.join(workspace, projectName)} -a vscode`, function (error, stout, stderr) {
		if (error) {
			console.log(chalk.red(stderr));
		}
	})
}
function openSelected() {
	const workspace = package.ecode_workspaces.defualt
	const allProject = execSync(`ls ${workspace}`).toString().split('\n').filter(item => !!item)

	const prompt = new AutoComplete({
		name: 'value',
		message: '选择要打开的项目',
		limit: 20,
		choices: allProject || []
	});

	prompt.run()
		.then((value) =>{
			openOne(value)
		})
		.catch(console.error);
}
module.exports = open