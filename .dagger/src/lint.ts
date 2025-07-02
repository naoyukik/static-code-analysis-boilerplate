/**
 * A generated module for Biome functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */
import { dag, type Container, type Directory, object, func } from "@dagger.io/dagger";

@object()
export class Lint {
  @func()
  createBaseContainer(source: Directory): Container {
    return dag
      .container()
      .from("bitnami/node:24.2.0")
      .withExec(["npm", "install", "-g", "--force", "pnpm@10.12.3"])
      .withWorkdir("/app")
      .withDirectory("/app", source, {
        exclude: ["node_modules/", ".git", ".dagger", ".github", ".idea", ".runConfigurations", ".gemini", "docker"],
      })
      .withExec(["pnpm", "install"])
      .withMountedCache("/root/.pnpm", dag.cacheVolume("pnpm-10"));
  }

  /**
   * Executes textlint on the provided source directory using a containerized environment.
   *
   * @param {Directory} source - The directory containing the source files to be linted.
   * @return {Promise<string>} A promise that resolves to the stdout output of the textlint command.
   */
  @func()
  async textlint(source: Directory): Promise<string> {
    const node = this.createBaseContainer(source);

    const runner = node.withExec(["pnpm", "run", "textlint"]);

    return runner.stdout();
  }

  @func()
  async biome(source: Directory): Promise<string> {
    const node = this.createBaseContainer(source);

    const runner = node.withExec(["pnpm", "run", "lint:biome"]);

    return runner.stdout();
  }

  @func()
  async eslint(source: Directory): Promise<string> {
    const node = this.createBaseContainer(source);

    const runner = node.withExec(["pnpm", "run", "lint"]);

    return runner.stdout();
  }
}
