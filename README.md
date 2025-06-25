# Markdown Image

A specialized fork of [imlinhanchao/vsc-markdown-image](https://github.com/imlinhanchao/vsc-markdown-image) that focuses exclusively on GitHub image uploads with project scope management.

**Upload to [rspack-contrib/rstack-design-resources](https://github.com/rspack-contrib/rstack-design-resources) by default.**

## ✨ Features

- **GitHub Only**: Streamlined to only support GitHub uploads
- **Project Scopes**: Organize images by project (rspack, rsbuild, rsdoctor, etc.)
- **Smart Token Management**: Automatic GitHub token setup with browser integration
- **Easy Upload**: `Alt + Shift + V` to upload clipboard images

## 🚀 Quick Start

1. **Install Extension** from VSCode marketplace
2. **Set GitHub Token**: Extension will guide you through token creation
3. **Choose Scope**: Select your project scope in settings
4. **Upload Images**: Copy image → Press `Alt + Shift + V` → Auto-insert markdown

Default uploads to `/{scope}/assets/` in [rstack-design-resources](https://github.com/rspack-contrib/rstack-design-resources), accessible via [assets.rspack.rs](https://assets.rspack.rs).

## ⚙️ Project Scopes

Choose the appropriate scope for your project:

| Scope      | Description               | Upload Path Example          |
| ---------- | ------------------------- | ---------------------------- |
| `rspack`   | Rspack related projects   | `/rspack/assets/image.png`   |
| `rsbuild`  | Rsbuild related projects  | `/rsbuild/assets/image.png`  |
| `rsdoctor` | Rsdoctor related projects | `/rsdoctor/assets/image.png` |
| `rslib`    | Rslib related projects    | `/rslib/assets/image.png`    |
| `rspress`  | Rspress related projects  | `/rspress/assets/image.png`  |
| `rstack`   | Rstack related projects   | `/rstack/assets/image.png`   |
| `rstest`   | Rstest related projects   | `/rstest/assets/image.png`   |
| `others`   | Other projects            | `/others/assets/image.png`   |

## 🔧 Configuration

### Required Settings

- `markdown-image.github.token`: GitHub personal access token
- `markdown-image.github.scope`: Project scope (default: `rspack`)

### Optional Settings

- `markdown-image.github.path`: Upload path (default: `/assets/`)
- `markdown-image.github.repository`: Target repository (default: rstack-design-resources)
- `markdown-image.github.cdn`: CDN URL (default: `https://assets.rspack.dev/${filepath}`)

## ⚙️ Default Configuration

The extension comes with the following default settings:

```json
{
  // Base Settings
  "markdown-image.base.uploadMethod": "GitHub",
  "markdown-image.base.uploadMethods": [],
  "markdown-image.base.codeType": "Markdown",
  "markdown-image.base.codeFormat": "![${alt}](${src})",
  "markdown-image.base.imageWidth": 0,
  "markdown-image.base.fileNameFormat": "${filename}-${timestamp}",
  "markdown-image.base.altFormat": "picture ${index}",
  "markdown-image.base.urlEncode": true,
  "markdown-image.base.fileFormat": "png",

  // GitHub Settings
  "markdown-image.github.scope": "rspack",
  "markdown-image.github.path": "/assets/",
  "markdown-image.github.token": "",
  "markdown-image.github.repository": "https://github.com/rspack-contrib/rstack-design-resources",
  "markdown-image.github.branch": "main",
  "markdown-image.github.cdn": "https://assets.rspack.dev/${filepath}",
  "markdown-image.github.httpProxy": ""
}
```

## 🔒 GitHub Token Setup

1. Go to [GitHub Settings > Tokens](https://github.com/settings/personal-access-tokens/new)
2. Create **Fine-grained token** with **Contents** permission
3. Extension will automatically prompt for token if missing

## 📋 Requirements

**Linux users**: Install `xclip`

```bash
# Ubuntu/Debian
sudo apt install xclip

# CentOS/RHEL
sudo yum install xclip
```

## 📜 Original Project

Fork of [vsc-markdown-image](https://github.com/imlinhanchao/vsc-markdown-image) by [imlinhanchao](https://github.com/imlinhanchao).

**Changes**: Removed all upload services except GitHub, added project scope management, enhanced token handling.

## 📄 License

MIT License
