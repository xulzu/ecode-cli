const fs = require('fs')
const chalk = require('chalk')
module.exports = function (swimLane) {
	if (!swimLane) {
		console.log(chalk.green(fs.readFileSync('/data/webapps/appenv')))
		return
	}
	fs.writeFileSync('/data/webapps/appenv',
		`env=test
deployenv=qa
swimlane=${swimLane}
zkserver=lion-zk.test.vip.sankuai.com:2181` )
	console.log(chalk.green('已经成功把泳道切换为' + swimLane))
}