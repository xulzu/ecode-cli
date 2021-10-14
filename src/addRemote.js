const chalk = require('chalk')
const package = require('../package.json')
const fs = require('fs')
const path = require('path')
function addremote(gitURL, name) {
	try {
		package.remotes[name] = gitURL
		fs.writeFileSync(path.join(path.resolve(__dirname, '..'), 'package.json'), JSON.stringify(package))
		console.log(chalk.green(`新增${gitURL} 且重命名${name} 成功`));
	} catch (error) {
		console.log(chalk.red(error));
	}

}
module.exports = addremote