import Client, { connect } from '@dagger.io/dagger';
// import { Secret } from '@dagger.io/dagger/dist/api/client.gen'

// initialize Dagger client
connect(async (client: Client) => {
  // read secret from host variable
  // const secret: Secret = client.setSecret("gh-secret", <string>process.env["GH_SECRET"])
  // const secret: Secret = client.setSecret("reviewdog-secret", <string>process.env["REVIEWDOG_GITHUB_API_TOKEN"])

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
    // .withSecretVariable('GITHUB_TOKEN', secret)
    .withEnvVariable('REVIEWDOG_GITHUB_API_TOKEN', <string>process.env["GITHUB_API_TOKEN"])
    .withEnvVariable('CI_REPO_OWNER', <string>process.env["CI_REPO_OWNER"])
    .withEnvVariable('CI_REPO_NAME', <string>process.env["CI_REPO_NAME"])
    .withEnvVariable('CI_COMMIT', <string>process.env["CI_COMMIT"])
    // .withExec(['echo', <string>process.env["GITHUB_API_TOKEN"]])
    // .withExec(['echo', <string>process.env["github"]])
    // .withEnvVariable('REVIEWDOG_GITHUB_API_TOKEN', <string>process.env["GITHUB_API_TOKEN"])
    // .withExec(['REVIEWDOG_GITHUB_API_TOKEN=' + <string>process.env["REVIEWDOG_GITHUB_API_TOKEN"], './bin/reviewdog', '-conf=./.reviewdog.yml', '-runners=textlint', '-reporter=github-check', '-filter-mode=nofilter']);
    .withExec(['./bin/reviewdog', '-conf=./.reviewdog.yml', '-runners=textlint', '-reporter=github-check', '-filter-mode=nofilter', '-tee']);
    // .withExec(['./bin/reviewdog', '-conf=./.reviewdog.yml', '-runners=textlint', '-diff=/usr/bin/git diff main']);

  // execute
  const textlintResult = await runner.stdout();

  // print output
  console.log(textlintResult);
});
