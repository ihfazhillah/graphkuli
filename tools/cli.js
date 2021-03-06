const cmd = require('commander')
const path = require('path')
const version = require('../package.json').version
let config = require('../config')
cmd
  .version(version)
  .usage('[options]')
  .option('-c, --client [server]', 'database provider, ex: mysql')
  .option('-H, --host [hostname]', 'database hostname, ex: localhost')
  .option('-u, --user [user]', 'database username, ex: root')
  .option('-p, --pass [password]', 'database password, ex: admin')
  .option('-d, --db [name]', 'database name, ex: mydatabase')
  .option('-f, --dbfile [file]', 'SQLite source filename, ex: mydb.sqlite')
  .option('-P, --port [number]', 'application port [5000]')
  .option('-o, --output [directory]', 'output directory path')
  .parse(process.argv);


cmd.on('--help', function() {
  console.log('\nExamples:\n')
  console.log(`    $ graphkuli -H localhost -u root -p admin -d mydatabase -o output/dir/path \n`)
});

if (!process.argv.slice(2).length) {
  cmd.outputHelp();
  // cmd.help()
} else {
  if (!cmd.output) {
    cmd.outputHelp()
    console.log(`\Error:\n\n    Output directory is not specified.`)
    process.exit()
  } else if (!cmd.db) {
    cmd.outputHelp()
    console.log(`\Error:\n\n    Database name cannnot be empty.`)
    process.exit()
  } else {
    let dbname = cmd.args
    if (cmd.client) config.db.client = cmd.client || 'mysql'
    if (cmd.host) config.db.connection.host = cmd.host || 'localhost'
    if (cmd.user) config.db.connection.user = cmd.user || 'root'
    if (cmd.pass) config.db.connection.password = cmd.pass || ''
    if (cmd.db) config.db.connection.database = cmd.db
    if (cmd.dbfile) config.dbFile = cmd.dbfile
    if (cmd.port) config.port = cmd.port || 5000
    if (cmd.output) config.outputDir = cmd.output || 'graphkuli_output'
    module.exports = config
  }
}