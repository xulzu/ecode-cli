const { execSync, exec } = require('child_process');
const package = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const { AutoComplete } = require('enquirer');

function deleteProject(projectName) {
	if (projectName) {
		deleteItem(projectName)
	} else {
		openSelected()
	}
}
function deleteItem(projectName) {
	const workspace = package.ecode_workspaces.defualt
	exec(`rm -rf ${path.join(workspace, projectName)} `, function (error, stout, stderr) {
		if (error) {
			console.log(chalk.red(stderr));
		} else {
			console.log(chalk.green('删除', projectName, '成功'))
		}
	})
}
function openSelected() {
	const workspace = package.ecode_workspaces.defualt
	const allProject = execSync(`ls ${workspace}`).toString().split('\n').filter(item => !!item)
	const prompt = new AutoComplete({
		name: 'value',
		message: '选择要删除的项目',
		limit: 10,
		choices: allProject || []
	});

	prompt.run()
		.then((value) => {
			deleteItem(value)
		})
		.catch(console.error);
}
module.exports = deleteProject