const chalk = require('chalk')
const package = require('../package.json')
const fs = require('fs')
const path = require('path')
function deleteRemote(name) {
	try {
		delete package.remotes[name]
		fs.writeFileSync(path.join(path.resolve(__dirname, '..'), 'package.json'), JSON.stringify(package))
		console.log(chalk.green(`删除${name}成功`));
	} catch (error) {
		console.log(chalk.red(error));
	}

}
module.exports = deleteRemote