import Client, { connect } from '@dagger.io/dagger';

// initialize Dagger client
connect(async (client: Client) => {
  const source = client.host().directory('.', { exclude: ['node_modules/'] });
  const node = client.container().from('bitnami/node:18')
    .withExec(['corepack', 'enable', 'pnpm'])
    .withExec(['corepack', 'prepare', 'pnpm@latest', '--activate'])
    .withExec(['apt-get', 'update'])
    .withExec(['apt-get', 'install', 'git'])
    .withExec(['curl', '-sfLO', 'https://raw.githubusercontent.com/reviewdog/reviewdog/master/install.sh'])
    .withExec(['sh', 'install.sh']);

  // textlint
  const runner = node
    .withMountedDirectory('/app', source)
    .withExec(['pnpm', 'install'])
    .withExec(['./bin/reviewdog', '-conf=./.reviewdog.yml', '-runners=textlint', '-diff=/usr/bin/git diff main']);

  // execute
  const textlintResult = await runner.stdout();

  // print output
  console.log(textlintResult);
});
