# Markdown Image

A specialized fork of [imlinhanchao/vsc-markdown-image](https://github.com/imlinhanchao/vsc-markdown-image) that focuses exclusively on GitHub image uploads with project scope management.

**Upload to [rspack-contrib/rstack-design-resources](https://github.com/rspack-contrib/rstack-design-resources) by default.**

## ✨ Features

- **GitHub Only**: Streamlined to only support GitHub uploads
- **Project Scopes**: Organize images by project (rspack, rsbuild, rsdoctor, etc.)
- **Image Compression**: Automatic compression to reduce file size before uploading
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

- `rstack-markdown-image.github.token`: GitHub personal access token
- `rstack-markdown-image.github.scope`: Project scope (default: `rspack`)

### Optional Settings

- `rstack-markdown-image.github.path`: Upload path (default: `/assets/`)
- `rstack-markdown-image.github.repository`: Target repository (default: rstack-design-resources)
- `rstack-markdown-image.github.cdn`: CDN URL (default: `https://assets.rspack.dev/${filepath}`)

### 🔐 Repository Access & Fork Setup

If you don't have write permissions to the default `rspack-contrib/rstack-design-resources` repository, you can fork it and use your own fork:

1. **Fork the Repository**: Go to [rstack-design-resources](https://github.com/rspack-contrib/rstack-design-resources) and click "Fork"

2. **Update Repository Setting**: In VSCode settings, change the repository URL:

   ```json
   "rstack-markdown-image.github.repository": "https://github.com/YOUR_USERNAME/rstack-design-resources"
   ```

3. **Create GitHub Token**: Ensure your token has **Contents** permission for your forked repository

4. **Update CDN URL** (optional): If you want to use a different CDN or GitHub raw URLs:
   ```json
   "rstack-markdown-image.github.cdn": "https://raw.githubusercontent.com/YOUR_USERNAME/rstack-design-resources/main/${filepath}"
   ```

> **💡 Tip**: Using your own fork allows you to have full control over the uploaded images and can serve as a backup solution if the main repository is unavailable.

## ⚙️ Default Configuration

The extension comes with the following default settings:

```json
{
  // Base Settings
  "rstack-markdown-image.base.uploadMethod": "GitHub",
  "rstack-markdown-image.base.uploadMethods": [],
  "rstack-markdown-image.base.codeType": "Markdown",
  "rstack-markdown-image.base.codeFormat": "![${alt}](${src})",
  "rstack-markdown-image.base.imageWidth": 0,
  "rstack-markdown-image.base.fileNameFormat": "${filename}-${timestamp}",
  "rstack-markdown-image.base.altFormat": "picture ${index}",
  "rstack-markdown-image.base.urlEncode": true,
  "rstack-markdown-image.base.fileFormat": "png",
  "rstack-markdown-image.base.compressEnabled": true,
  "rstack-markdown-image.base.compressQuality": 80,

  // GitHub Settings
  "rstack-markdown-image.github.scope": "rspack",
  "rstack-markdown-image.github.path": "/assets/",
  "rstack-markdown-image.github.token": "",
  "rstack-markdown-image.github.repository": "https://github.com/rspack-contrib/rstack-design-resources",
  "rstack-markdown-image.github.branch": "main",
  "rstack-markdown-image.github.cdn": "https://assets.rspack.dev/${filepath}",
  "rstack-markdown-image.github.httpProxy": ""
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
