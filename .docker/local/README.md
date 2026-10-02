# 本地源码构建与部署

本机功能验证时，在 Windows PowerShell 7 中从仓库根目录运行：

```powershell
pwsh -File .docker/local/deploy.ps1 -UseTestPublicKey
```

需要 Docker Desktop 正常运行并使用 Linux 容器。构建目标为 `linux/amd64`。首次构建会下载 Node、Rust 和软件依赖，然后依次编译服务端、网页、管理后台及手机网页。本流程不预置大模型权重。

当前源码在启动时要求嵌入 `AFFINE_PRO_PUBLIC_KEY`。这把公钥用于确认授权文件的签名。`-UseTestPublicKey` 从官方 [build-test.yml](../../.github/workflows/build-test.yml) 读取公开测试公钥，用于本机测试，正式付费授权兼容性未经验证。正式用途请使用与官方授权匹配的正式公钥，并指定 PEM 格式文件：

```powershell
pwsh -File .docker/local/deploy.ps1 -PublicKeyPath 'E:\路径\affine-pro-public-key.pem'
```

AFFiNE 应用镜像为本地生成的 `affine-local:source`。基础镜像使用 Node、Redis 和带向量扩展的 PostgreSQL。构建阶段和启动顺序参考官方 [build-images.yml](../../.github/workflows/build-images.yml)、[Dockerfile](../../.github/deployment/node/Dockerfile) 和 [compose.yml](../selfhost/compose.yml)。

只构建镜像：

```powershell
pwsh -File .docker/local/deploy.ps1 -BuildOnly -UseTestPublicKey
```

使用已构建的镜像启动：

```powershell
pwsh -File .docker/local/deploy.ps1 -SkipBuild
```

构建默认采用源码所在开发分支的构建类型。需要其他类型时传入 `-BuildType stable` 等参数；这个参数控制页面的构建配置，不会将开发分支代码转换为稳定版本。

## 访问与数据

默认访问 <http://localhost:3010>，管理后台为 <http://localhost:3010/admin>。端口绑定、服务地址和镜像定义见 [compose.yml](./compose.yml)。需要调整访问地址时，在本目录 `.env` 中设置 `AFFINE_PORT` 和 `AFFINE_SERVER_EXTERNAL_URL`。

脚本首次部署会生成数据库密码并保存到 `.env`，该文件不会提交到 Git。文件、配置和数据库保存于 Docker 数据卷，普通停止和重启会保留数据。数据库初始化完成后才会启动应用。

## 日志与停止

构建日志保存在本目录 `logs/build.log`。在仓库根目录执行：

```powershell
docker compose --env-file .docker/local/.env -f .docker/local/compose.yml logs --tail 100 affine affine_migration
docker compose --env-file .docker/local/.env -f .docker/local/compose.yml ps -a
docker compose --env-file .docker/local/.env -f .docker/local/compose.yml stop
```

源码更新后重新运行部署脚本即可重新构建。升级前备份 Docker 数据卷，尤其是数据库、文件存储和配置。

## 只更新网页时的快速构建

本机已有从源码生成的 `affine-local:builder` 和 `affine-local:runtime-base` 时，可以使用 [Dockerfile.frontend](./Dockerfile.frontend) 编译网页、管理后台和手机网页，复用已编译的服务端。它会按源码中的译文重新生成语言资源。

```powershell
docker build --file .docker/local/Dockerfile.frontend --tag affine-local:zh-hans .
if ($LASTEXITCODE -ne 0) { throw '网页构建失败，停止部署。' }
docker tag affine-local:zh-hans affine-local:source
pwsh -File .docker/local/deploy.ps1 -SkipBuild
```

`builder` 来自本目录完整 Dockerfile 的 `backend` 阶段；`runtime-base` 来自完整源码构建的运行镜像。准备这两个镜像时，要使用完整构建中相同的公钥和构建类型。新机器没有这两个镜像，或服务端、依赖、构建配置发生变化时，请使用前面的完整构建命令。

## 中文界面修改与验证

补充的固定文案放在 `packages/frontend/i18n/src/resources/en.json` 和 `zh-Hans.json` 中。网页通过 `translateUiText` 翻译固定文案，编辑器通过 `editorText` 接入应用的当前语言。命令内部名称、颜色值和文档数据保留原值，在显示菜单、按钮和说明时翻译。

修改后检查编译和代码规则，再部署镜像并刷新浏览器。切换一次英文和简体中文，检查文档插入菜单及中文搜索、画布工具与对象菜单、编辑器设置和管理后台。设置面板中的内置示例单独翻译；用户文档、工作区名称、字体名称、代码示例中的语言关键字和品牌名称保留原文。
