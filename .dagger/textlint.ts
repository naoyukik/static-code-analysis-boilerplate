import Client, { connect } from '@dagger.io/dagger';

// initialize Dagger client
connect(async (client: Client) => {
  const source = client.host().directory('.', { exclude: ['node_modules/'] });
  const node = client.container().from('bitnami/node:18')
    .withExec(['corepack', 'enable', 'pnpm'])
    .withExec(['corepack', 'prepare', 'pnpm@latest', '--activate']);

  // textlint
  const runner = node
    .withMountedDirectory('/app', source)
    .withExec(['pnpm', 'install'])
    .withExec(['pnpm', 'run', 'textlint']);

  // execute
  const textlintResult = await runner.stdout();

  // print output
  console.log(textlintResult);
});
