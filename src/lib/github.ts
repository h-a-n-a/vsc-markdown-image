import utils from './utils';
import { locale as $l } from './utils';
import * as path from 'path';
import * as vscode from 'vscode';
import * as GitHubPic from 'github-picbed';

class GitHub implements Upload {
  config: Config;
  static github: any;
  constructor(config: Config) {
    if (!GitHub.github) {
      GitHub.github = GitHubPic(config.github);
    }
    if (
      !GitHub.github.lastconfig ||
      GitHub.github.lastconfig.token !== config.github.token ||
      GitHub.github.lastconfig.branch !== config.github.branch ||
      GitHub.github.lastconfig.repository !== config.github.repository ||
      GitHub.github.lastconfig.scope !== config.github.scope
    ) {
      this.reconfig(config);
    }
    this.config = config;
  }

  async reconfig(config: Config) {
    try {
      this.config = config;
      GitHub.github.lastconfig = config.github;
      await GitHub.github.config(config.github);
    } catch (error) {
      let e = error as Error;
      vscode.window.showErrorMessage(`${$l['config_failed']}${e.message}`);
    }
  }

  async upload(filePath: string, savePath: string): Promise<string | null> {
    try {
      if (!this.config.github.token || this.config.github.token.trim() === '') {
        const result = await vscode.window.showErrorMessage(
          $l['github_token_missing'],
          $l['create_and_input_token'],
          $l['input_token'],
          $l['open_settings'],
          $l['cancel']
        );

        if (result === $l['create_and_input_token']) {
          vscode.env.openExternal(
            vscode.Uri.parse(
              'https://github.com/settings/personal-access-tokens/new'
            )
          );

          const readyResult = await vscode.window.showInformationMessage(
            $l['token_creation_opened'],
            $l['token_ready'],
            $l['cancel']
          );

          if (readyResult === $l['token_ready']) {
            const token = await vscode.window.showInputBox({
              prompt: $l['input_github_token_prompt'],
              password: true,
              placeHolder: $l['github_token_placeholder'],
              validateInput: (value: string) => {
                if (!value || value.trim().length === 0) {
                  return $l['github_token_empty_error'];
                }
                if (value.trim().length < 10) {
                  return $l['github_token_too_short_error'];
                }
                return null;
              },
            });

            if (token && token.trim()) {
              const config = vscode.workspace.getConfiguration(
                'rstack-markdown-image'
              );
              await config.update(
                'github.token',
                token.trim(),
                vscode.ConfigurationTarget.Global
              );

              this.config.github.token = token.trim();
              await this.reconfig(this.config);

              vscode.window.showInformationMessage($l['github_token_saved']);
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else if (result === $l['input_token']) {
          const token = await vscode.window.showInputBox({
            prompt: $l['input_github_token_prompt'],
            password: true,
            placeHolder: $l['github_token_placeholder'],
            validateInput: (value: string) => {
              if (!value || value.trim().length === 0) {
                return $l['github_token_empty_error'];
              }
              if (value.trim().length < 10) {
                return $l['github_token_too_short_error'];
              }
              return null;
            },
          });

          if (token && token.trim()) {
            const config = vscode.workspace.getConfiguration('markdown-image');
            await config.update(
              'github.token',
              token.trim(),
              vscode.ConfigurationTarget.Global
            );

            this.config.github.token = token.trim();
            await this.reconfig(this.config);

            vscode.window.showInformationMessage($l['github_token_saved']);
          } else {
            return null;
          }
        } else if (result === $l['open_settings']) {
          vscode.commands.executeCommand(
            'workbench.action.openSettings',
            'rstack-markdown-image.github.token'
          );
          return null;
        } else {
          return null;
        }
      }

      if (
        !this.config.github.repository ||
        this.config.github.repository.trim() === ''
      ) {
        vscode.window.showErrorMessage($l['github_repository_missing']);
        vscode.commands.executeCommand(
          'workbench.action.openSettings',
          'rstack-markdown-image.github.repository'
        );
        return null;
      }

      while (!GitHub.github.isInitialized()) {
        await utils.sleep(100);
      }

      // 构建带有scope的路径
      const scope = this.config.github.scope || 'rspack';
      const scopedPath = `/${scope}${this.config.github.path}`;
      savePath = path
        .join(scopedPath, savePath)
        .replace(/\\/g, '/')
        .replace(/^\/|\/$/, '');
      let data = await GitHub.github.upload({
        data: filePath,
        filename: savePath,
      });
      let options = GitHub.github.options;

      return this.config.github.cdn
        .replace(/\${username}/g, options.username)
        .replace(/\${repository}/g, options.repository)
        .replace(/\${branch}/g, options.branch)
        .replace(/\${filepath}/g, data.filename);
    } catch (error) {
      let e = error as Error;

      // 如果是认证错误，提示用户检查 token
      if (
        e.message.includes('401') ||
        e.message.includes('Unauthorized') ||
        e.message.includes('Bad credentials')
      ) {
        const result = await vscode.window.showErrorMessage(
          $l['github_token_invalid'],
          $l['create_token'],
          $l['open_settings']
        );

        if (result === $l['create_token']) {
          vscode.env.openExternal(
            vscode.Uri.parse(
              'https://github.com/settings/personal-access-tokens'
            )
          );
        } else if (result === $l['open_settings']) {
          vscode.commands.executeCommand(
            'workbench.action.openSettings',
            'rstack-markdown-image.github.token'
          );
        }
      } else {
        vscode.window.showErrorMessage(`${$l['upload_failed']}${e.message}`);
      }
      return null;
    }
  }
}

export default GitHub;
